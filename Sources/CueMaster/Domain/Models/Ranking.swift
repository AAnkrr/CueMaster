import Foundation

// MARK: - Ranking Entry

struct RankingEntry: Identifiable, Codable {
    let id: String             // same as playerId
    let player: PlayerRef
    let rank: Int
    let previousRank: Int?
    let points: Int
    let season: String
    let rankingType: RankingType

    var rankChange: Int? {
        guard let prev = previousRank else { return nil }
        return prev - rank   // positive = moved up
    }

    var rankChangeFormatted: String {
        guard let change = rankChange else { return "-" }
        if change > 0 { return "↑\(change)" }
        if change < 0 { return "↓\(abs(change))" }
        return "→"
    }

    var pointsFormatted: String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.groupingSeparator = ","
        return "£\(formatter.string(from: NSNumber(value: points)) ?? "\(points)")"
    }
}

// MARK: - Ranking Type

enum RankingType: String, Codable, CaseIterable {
    case official     = "official"       // 2-year official world rankings
    case season       = "season"         // current season rankings
    case provisional  = "provisional"    // provisional seedings

    var label: String {
        switch self {
        case .official:     return "世界排名"
        case .season:       return "赛季排名"
        case .provisional:  return "临时种子"
        }
    }
}

// MARK: - Ranking List

struct RankingList: Codable {
    let type: RankingType
    let season: String
    let lastUpdated: Date
    let entries: [RankingEntry]

    var top16: [RankingEntry] { Array(entries.prefix(16)) }
    var top32: [RankingEntry] { Array(entries.prefix(32)) }
}
