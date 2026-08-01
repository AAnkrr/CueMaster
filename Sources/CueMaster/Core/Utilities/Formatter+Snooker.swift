import Foundation

// MARK: - Date Formatting Extensions

extension DateFormatter {
    static let snookerFull: DateFormatter = {
        let f = DateFormatter()
        f.dateFormat = "yyyy年M月d日"
        return f
    }()

    static let snookerShort: DateFormatter = {
        let f = DateFormatter()
        f.dateFormat = "M/d"
        return f
    }()

    static let snookerMonthDay: DateFormatter = {
        let f = DateFormatter()
        f.dateFormat = "M月d日"
        return f
    }()

    static let snookerTime: DateFormatter = {
        let f = DateFormatter()
        f.dateFormat = "HH:mm"
        return f
    }()
}

// MARK: - Number Formatting

extension NumberFormatter {
    static let prizeFund: NumberFormatter = {
        let f = NumberFormatter()
        f.numberStyle = .decimal
        f.groupingSeparator = ","
        return f
    }()
}

extension Int {
    var prizeFundFormatted: String {
        if self >= 1_000_000 {
            let m = Double(self) / 1_000_000.0
            return String(format: "£%.1fM", m)
        }
        if self >= 1_000 {
            let k = Double(self) / 1_000.0
            return String(format: "£%.0fK", k)
        }
        return "£\(self)"
    }
}
