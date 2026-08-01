import Foundation

// MARK: - News Item

struct NewsItem: Identifiable, Codable {
    let id: String
    let title: String
    let titleZh: String?
    let summary: String
    let source: NewsSource
    let url: URL
    let imageURL: URL?
    let publishedAt: Date
    let language: NewsLanguage
    let category: NewsCategory

    var displayTitle: String { titleZh ?? title }
    var timeAgo: String {
        let interval = Date().timeIntervalSince(publishedAt)
        switch interval {
        case ..<3600:        return "\(Int(interval / 60))分钟前"
        case ..<86400:       return "\(Int(interval / 3600))小时前"
        case ..<604800:      return "\(Int(interval / 86400))天前"
        case ..<2592000:     return "\(Int(interval / 604800))周前"
        default:
            let formatter = DateFormatter()
            formatter.dateFormat = "yyyy-MM-dd"
            return formatter.string(from: publishedAt)
        }
    }
}

enum NewsSource: String, Codable {
    case wst           = "wst"
    case bbc           = "bbc"
    case snookerHQ     = "snookerhq"
    case taiqiuHQ      = "taiqiuhq"
    case sina          = "sina"
    case custom        = "custom"

    var displayName: String {
        switch self {
        case .wst:       return "WST 官方"
        case .bbc:       return "BBC Sport"
        case .snookerHQ: return "SnookerHQ"
        case .taiqiuHQ:  return "台球HQ"
        case .sina:      return "新浪体育"
        case .custom:    return "其他"
        }
    }
}

enum NewsLanguage: String, Codable {
    case en, zh
}

enum NewsCategory: String, Codable, CaseIterable {
    case tournament = "tournament"
    case player     = "player"
    case ranking    = "ranking"
    case rule       = "rule"
    case other      = "other"

    var label: String {
        switch self {
        case .tournament: return "赛事"
        case .player:     return "球员"
        case .ranking:    return "排名"
        case .rule:       return "规则"
        case .other:      return "其他"
        }
    }
}
