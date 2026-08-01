import Foundation

// MARK: - Tournament Model

struct Tournament: Identifiable, Codable {
    let id: String
    let name: String
    let nameZh: String?
    let category: TournamentCategory
    let sportType: SportType
    let season: String
    let startDate: Date
    let endDate: Date
    let venue: String
    let city: String
    let country: String
    let prizeFund: Int       // in GBP
    let prizeFundFormatted: String
    let rounds: [RoundInfo]
    let status: EventStatus
    let defendingChampion: String?

    var displayName: String { nameZh ?? name }
    var dateRangeFormatted: String {
        let formatter = DateFormatter()
        formatter.dateFormat = "M月d日"
        return "\(formatter.string(from: startDate)) - \(formatter.string(from: endDate))"
    }
    var daysUntil: Int {
        Calendar.current.dateComponents([.day], from: Date(), to: startDate).day ?? 0
    }
    var daysUntilFormatted: String {
        if status == .live { return "进行中" }
        if status == .completed { return "已结束" }
        if daysUntil == 0 { return "今日开始" }
        if daysUntil == 1 { return "明天" }
        if daysUntil < 30 { return "\(daysUntil)天后" }
        let months = daysUntil / 30
        return "约\(months)个月后"
    }
}

// MARK: - Round Info

struct RoundInfo: Identifiable, Codable {
    let id: String
    let name: String         // "Final", "Semi-Final", "Quarter-Final", "Last 16", etc.
    let nameZh: String?      // "决赛", "半决赛", etc.
    let startDate: Date
    let endDate: Date
    let bestOf: Int          // e.g. 35 for World Championship final
    let matches: [Match]?

    var displayName: String { nameZh ?? name }
}

// MARK: - Event Status

enum EventStatus: String, Codable {
    case upcoming
    case live
    case completed

    var label: String {
        switch self {
        case .upcoming:  return "即将到来"
        case .live:      return "进行中"
        case .completed: return "已结束"
        }
    }
}
