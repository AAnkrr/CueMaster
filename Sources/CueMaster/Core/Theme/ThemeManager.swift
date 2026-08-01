import SwiftUI

// MARK: - Theme Manager

@Observable
final class ThemeManager {
    var selectedSport: SportType = .snooker {
        didSet { applyTheme() }
    }

    var colorScheme: ColorScheme? = .dark   // force dark mode

    // Computed from selectedSport
    var primaryColor: Color { selectedSport.themeColor }
    var accentColor: Color { selectedSport.accentColor }
    var backgroundColor: Color { selectedSport.backgroundColor }
    var surfaceColor: Color { selectedSport.surfaceColor }

    // Text colors
    var textPrimary: Color { .white }
    var textSecondary: Color { Color(white: 0.7) }
    var textTertiary: Color { Color(white: 0.5) }

    // UI Constants
    var cornerRadius: CGFloat { 16 }
    var smallCornerRadius: CGFloat { 10 }
    var cardPadding: CGFloat { 16 }

    func applyTheme() {
        // In production: update window tint, etc.
    }

    func colorForCategory(_ category: TournamentCategory) -> Color {
        category.color
    }
}

// MARK: - Color Extension (Hex Support)

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 6: // RGB (no alpha)
            (a, r, g, b) = (255, (int >> 16) & 0xFF, (int >> 8) & 0xFF, int & 0xFF)
        case 8: // ARGB
            (a, r, g, b) = ((int >> 24) & 0xFF, (int >> 16) & 0xFF, (int >> 8) & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
