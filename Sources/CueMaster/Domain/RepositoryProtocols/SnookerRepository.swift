import Foundation

// MARK: - Snooker Repository Protocol

protocol SnookerRepositoryProtocol {
    /// Fetch tournament schedule for a season
    func fetchSchedule(season: Int) async throws -> [Tournament]

    /// Fetch live/ongoing matches
    func fetchLiveMatches() async throws -> [Match]

    /// Fetch matches for a specific tournament
    func fetchMatches(tournamentId: String) async throws -> [Match]

    /// Fetch world rankings
    func fetchRankings(type: RankingType, season: Int) async throws -> RankingList

    /// Fetch player detail + season stats
    func fetchPlayer(id: String) async throws -> Player

    /// Fetch player season stats
    func fetchPlayerStats(playerId: String, season: Int) async throws -> PlayerSeasonStats

    /// Search players
    func searchPlayers(query: String) async throws -> [Player]

    /// Fetch news (aggregated from multiple sources)
    func fetchNews(sportType: SportType, language: NewsLanguage) async throws -> [NewsItem]
}
