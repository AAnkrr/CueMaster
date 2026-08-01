import SwiftUI

// MARK: - Sport Type (赛事类型)

enum SportType: String, CaseIterable, Identifiable, Codable {
    case snooker    = "snooker"
    case chinese8   = "chinese_8"
    case nineball   = "nineball"

    var id: String { rawValue }

    var name: String {
        switch self {
        case .snooker:  return "斯诺克"
        case .chinese8: return "中式八球"
        case .nineball: return "九球"
        }
    }

    var nameEn: String {
        switch self {
        case .snooker:  return "Snooker"
        case .chinese8: return "Chinese 8-Ball"
        case .nineball: return "9-Ball"
        }
    }

    var icon: String {
        switch self {
        case .snooker:  return "circle.circle.fill"
        case .chinese8: return "8.circle.fill"
        case .nineball: return "9.circle.fill"
        }
    }

    var themeColor: Color {
        switch self {
        case .snooker:  return Color(hex: "1B7A4A")
        case .chinese8: return Color(hex: "C41E3A")
        case .nineball: return Color(hex: "1E3A8A")
        }
    }

    var accentColor: Color {
        switch self {
        case .snooker:  return Color(hex: "C8A951")
        case .chinese8: return Color(hex: "FFD700")
        case .nineball: return Color(hex: "F59E0B")
        }
    }

    var backgroundColor: Color {
        switch self {
        case .snooker:  return Color(hex: "0D1B16")
        case .chinese8: return Color(hex: "1A0D0E")
        case .nineball: return Color(hex: "0D111A")
        }
    }

    var surfaceColor: Color {
        switch self {
        case .snooker:  return Color(hex: "152A20")
        case .chinese8: return Color(hex: "2A1517")
        case .nineball: return Color(hex: "151A2A")
        }
    }
}

// MARK: - Tournament Category

enum TournamentCategory: String, Codable {
    case ranking       = "ranking"
    case invitational  = "invitational"
    case tripleCrown   = "triple_crown"
    case major         = "major"
    case minor         = "minor"

    var label: String {
        switch self {
        case .ranking:      return "排名赛"
        case .invitational: return "邀请赛"
        case .tripleCrown:  return "三重冠"
        case .major:        return "大赛"
        case .minor:        return "小型赛"
        }
    }

    var color: Color {
        switch self {
        case .ranking:      return Color(hex: "FFD700")
        case .invitational: return Color(hex: "4169E1")
        case .tripleCrown:  return Color(hex: "FF4500")
        case .major:        return Color(hex: "FF8C00")
        case .minor:        return Color(hex: "888888")
        }
    }
}
