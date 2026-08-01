import Foundation

// MARK: - Player Model

struct Player: Identifiable, Codable, Equatable {
    let id: String
    let firstName: String
    let lastName: String
    let nameZh: String?
    let nationality: String        // ISO country code, e.g. "ENG", "CHN"
    let nationalityZh: String
    let turnedPro: Int
    let highestRanking: Int
    let imageURL: URL?
    let flagEmoji: String

    var displayName: String { "\(firstName) \(lastName)" }
    var shortName: String { "\(String(lastName.prefix(1))). \(firstName)" }

    var displayNameLocalized: String {
        nameZh ?? displayName
    }

    // Computed from current rankings
    var currentRanking: Int?
    var rankingPoints: Int?

    static func == (lhs: Player, rhs: Player) -> Bool {
        lhs.id == rhs.id
    }
}

// MARK: - Player Season Stats

struct PlayerSeasonStats: Identifiable, Codable {
    var id: String { playerId + season }
    let playerId: String
    let season: String
    let matchesPlayed: Int
    let matchesWon: Int
    let centuries: Int
    let highestBreak: Int
    let prizeMoneyEarned: Int

    var winRate: Double {
        guard matchesPlayed > 0 else { return 0 }
        return Double(matchesWon) / Double(matchesPlayed)
    }

    var winRateFormatted: String {
        String(format: "%.0f%%", winRate * 100)
    }
}

// MARK: - Player Ref (lightweight reference for matches)

struct PlayerRef: Identifiable, Codable {
    let id: String
    let firstName: String
    let lastName: String
    let nationality: String
    let flagEmoji: String

    var displayName: String { "\(firstName) \(lastName)" }
}
