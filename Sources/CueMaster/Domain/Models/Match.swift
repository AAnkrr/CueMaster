import Foundation

// MARK: - Match Model

struct Match: Identifiable, Codable {
    let id: String
    let tournamentId: String
    let roundName: String
    let roundNameZh: String?
    let player1: PlayerRef
    let player2: PlayerRef
    let score1: Int?
    let score2: Int?
    let frames: [FrameResult]
    let status: MatchStatus
    let startTime: Date?
    let tableNumber: Int?
    let referee: String?

    var isLive: Bool { status == .live }
    var isCompleted: Bool { status == .completed }
    var winner: PlayerRef? {
        guard isCompleted, let s1 = score1, let s2 = score2 else { return nil }
        return s1 > s2 ? player1 : player2
    }
    var scoreDisplay: String {
        guard let s1 = score1, let s2 = score2 else { return "vs" }
        return "\(s1) - \(s2)"
    }
    var displayRound: String { roundNameZh ?? roundName }
}

// MARK: - Match Status

enum MatchStatus: String, Codable {
    case upcoming
    case live
    case completed
    case interrupted

    var label: String {
        switch self {
        case .upcoming:     return "未开始"
        case .live:         return "● 进行中"
        case .completed:    return "已结束"
        case .interrupted:  return "暂停"
        }
    }

    var color: String {
        switch self {
        case .upcoming:     return "888888"
        case .live:         return "FF4444"
        case .completed:    return "44AA44"
        case .interrupted:  return "FFAA00"
        }
    }
}

// MARK: - Frame Result

struct FrameResult: Identifiable, Codable {
    var id: String { "\(matchId ?? "")-\(frameNumber)" }
    let matchId: String?
    let frameNumber: Int
    let score1: Int
    let score2: Int
    let highestBreak: Int?
    let durationSeconds: TimeInterval?

    var highestBreakFormatted: String {
        guard let hb = highestBreak, hb > 0 else { return "-" }
        return "\(hb)"
    }

    var isMaximumBreak: Bool { highestBreak == 147 }
    var isCentury: Bool { (highestBreak ?? 0) >= 100 }

    var durationFormatted: String? {
        guard let d = durationSeconds else { return nil }
        let min = Int(d) / 60
        let sec = Int(d) % 60
        return "\(min):\(String(format: "%02d", sec))"
    }
}
