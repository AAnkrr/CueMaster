import Foundation

// MARK: - Snooker Repository Implementation

final class SnookerRepositoryImpl: SnookerRepositoryProtocol {
    private let api: SnookerAPIClient
    private let cache: LocalCache

    init(api: SnookerAPIClient = .shared, cache: LocalCache = .shared) {
        self.api = api
        self.cache = cache
    }

    func fetchSchedule(season: Int) async throws -> [Tournament] {
        let endpoint = SnookerEndpoint.events(season: season)
        let raw: SnookerEventsResponse = try await api.fetch(
            endpoint: endpoint,
            cacheKey: "schedule_\(season)",
            cacheDuration: APIConfig.CacheDuration.schedule,
            as: SnookerEventsResponse.self
        )
        return raw.toTournaments()
    }

    func fetchLiveMatches() async throws -> [Match] {
        let endpoint = SnookerEndpoint.liveMatches
        let raw: SnookerMatchesResponse = try await api.fetch(
            endpoint: endpoint,
            cacheKey: "live_matches",
            cacheDuration: APIConfig.CacheDuration.liveScores,
            as: SnookerMatchesResponse.self
        )
        return raw.toMatches()
    }

    func fetchMatches(tournamentId: String) async throws -> [Match] {
        let endpoint = SnookerEndpoint.matches(eventId: Int(tournamentId) ?? 0)
        let raw: SnookerMatchesResponse = try await api.fetch(
            endpoint: endpoint,
            cacheKey: "matches_\(tournamentId)",
            cacheDuration: APIConfig.CacheDuration.liveScores,
            as: SnookerMatchesResponse.self
        )
        return raw.toMatches()
    }

    func fetchRankings(type: RankingType, season: Int) async throws -> RankingList {
        let endpoint = SnookerEndpoint.rankings(season: season)
        let raw: SnookerRankingsResponse = try await api.fetch(
            endpoint: endpoint,
            cacheKey: "rankings_\(type.rawValue)_\(season)",
            cacheDuration: APIConfig.CacheDuration.rankings,
            as: SnookerRankingsResponse.self
        )
        return raw.toRankingList(type: type, season: "\(season)")
    }

    func fetchPlayer(id: String) async throws -> Player {
        let endpoint = SnookerEndpoint.player(playerId: Int(id) ?? 0)
        return try await api.fetch(
            endpoint: endpoint,
            cacheKey: "player_\(id)",
            cacheDuration: APIConfig.CacheDuration.players,
            as: Player.self
        )
    }

    func fetchPlayerStats(playerId: String, season: Int) async throws -> PlayerSeasonStats {
        let endpoint = SnookerEndpoint.player(playerId: Int(playerId) ?? 0)
        return try await api.fetch(
            endpoint: endpoint,
            cacheKey: "player_stats_\(playerId)_\(season)",
            cacheDuration: APIConfig.CacheDuration.players,
            as: PlayerSeasonStats.self
        )
    }

    func searchPlayers(query: String) async throws -> [Player] {
        let endpoint = SnookerEndpoint.searchPlayers(query: query)
        let raw: SnookerPlayersResponse = try await api.fetch(
            endpoint: endpoint,
            cacheKey: nil,
            cacheDuration: nil,
            as: SnookerPlayersResponse.self
        )
        return raw.toPlayers()
    }

    func fetchNews(sportType: SportType, language: NewsLanguage) async throws -> [NewsItem] {
        // For MVP, return mock news data
        // In production, this would aggregate from multiple RSS/API sources
        // via a backend proxy
        return MockData.newsItems.filter { $0.language == language }
    }
}

// MARK: - Raw API Response Types (api.snooker.org format)

private struct SnookerEventsResponse: Codable {
    // Structure depends on api.snooker.org response format
    // This is a simplified representation
    let events: [SnookerRawEvent]?

    func toTournaments() -> [Tournament] {
        events?.compactMap { $0.toTournament() } ?? []
    }
}

private struct SnookerRawEvent: Codable {
    let id: String?
    let name: String?
    let venue: String?
    let city: String?
    let country: String?
    let startDate: String?
    let endDate: String?
    let prizeFund: String?

    func toTournament() -> Tournament? {
        guard let id = id, let name = name else { return nil }
        let formatter = ISO8601DateFormatter()
        return Tournament(
            id: id,
            name: name,
            nameZh: nil,
            category: .ranking,
            sportType: .snooker,
            season: "2025/26",
            startDate: formatter.date(from: startDate ?? "") ?? Date(),
            endDate: formatter.date(from: endDate ?? "") ?? Date(),
            venue: venue ?? "",
            city: city ?? "",
            country: country ?? "",
            prizeFund: Int(prizeFund ?? "0") ?? 0,
            prizeFundFormatted: prizeFund ?? "N/A",
            rounds: [],
            status: .upcoming,
            defendingChampion: nil
        )
    }
}

private struct SnookerMatchesResponse: Codable {
    let matches: [SnookerRawMatch]?
    func toMatches() -> [Match] { matches?.compactMap { $0.toMatch() } ?? [] }
}

private struct SnookerRawMatch: Codable {
    let id: String?
    let player1: String?
    let player2: String?
    let score1: String?
    let score2: String?
    let status: String?
    let startTime: String?

    func toMatch() -> Match? {
        guard let id = id, let p1 = player1, let p2 = player2 else { return nil }
        let formatter = ISO8601DateFormatter()
        return Match(
            id: id,
            tournamentId: "",
            roundName: "",
            roundNameZh: nil,
            player1: PlayerRef(id: p1, firstName: p1, lastName: "", nationality: "", flagEmoji: ""),
            player2: PlayerRef(id: p2, firstName: p2, lastName: "", nationality: "", flagEmoji: ""),
            score1: Int(score1 ?? ""),
            score2: Int(score2 ?? ""),
            frames: [],
            status: MatchStatus(rawValue: status ?? "upcoming") ?? .upcoming,
            startTime: startTime.flatMap { formatter.date(from: $0) },
            tableNumber: nil,
            referee: nil
        )
    }
}

private struct SnookerRankingsResponse: Codable {
    let rankings: [SnookerRawRanking]?
    func toRankingList(type: RankingType, season: String) -> RankingList {
        RankingList(
            type: type,
            season: season,
            lastUpdated: Date(),
            entries: rankings?.enumerated().compactMap { idx, raw in
                raw.toRankingEntry(rank: idx + 1, type: type, season: season)
            } ?? []
        )
    }
}

private struct SnookerRawRanking: Codable {
    let playerId: String?
    let firstName: String?
    let lastName: String?
    let nationality: String?
    let points: String?

    func toRankingEntry(rank: Int, type: RankingType, season: String) -> RankingEntry? {
        guard let pid = playerId, let fn = firstName, let ln = lastName else { return nil }
        return RankingEntry(
            id: pid,
            player: PlayerRef(id: pid, firstName: fn, lastName: ln, nationality: nationality ?? "", flagEmoji: ""),
            rank: rank,
            previousRank: nil,
            points: Int(points ?? "0") ?? 0,
            season: season,
            rankingType: type
        )
    }
}

private struct SnookerPlayersResponse: Codable {
    let players: [SnookerRawPlayer]?
    func toPlayers() -> [Player] {
        players?.compactMap { $0.toPlayer() } ?? []
    }
}

private struct SnookerRawPlayer: Codable {
    let id: String?
    let firstName: String?
    let lastName: String?
    let nationality: String?
    let turnedPro: String?
    let highestRanking: String?

    func toPlayer() -> Player? {
        guard let id = id, let fn = firstName, let ln = lastName else { return nil }
        return Player(
            id: id,
            firstName: fn,
            lastName: ln,
            nameZh: nil,
            nationality: nationality ?? "",
            nationalityZh: nationality ?? "",
            turnedPro: Int(turnedPro ?? "0") ?? 0,
            highestRanking: Int(highestRanking ?? "0") ?? 0,
            imageURL: nil,
            flagEmoji: ""
        )
    }
}
