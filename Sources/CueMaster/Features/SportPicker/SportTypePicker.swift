import SwiftUI

// MARK: - Sport Type Picker (Homepage Selector)

struct SportTypePicker: View {
    @Binding var selectedSport: SportType
    @Environment(ThemeManager.self) private var theme

    var body: some View {
        HStack(spacing: 0) {
            ForEach(SportType.allCases) { sport in
                Button {
                    withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                        selectedSport = sport
                        theme.selectedSport = sport
                    }
                } label: {
                    VStack(spacing: 6) {
                        Image(systemName: sport.icon)
                            .font(.system(size: 20))
                        Text(sport.name)
                            .font(.caption)
                            .fontWeight(selectedSport == sport ? .bold : .regular)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 12)
                    .background(selectedSport == sport ? sport.themeColor.opacity(0.25) : Color.clear)
                    .foregroundColor(selectedSport == sport ? sport.themeColor : theme.textSecondary)
                    .clipShape(RoundedRectangle(cornerRadius: theme.smallCornerRadius))
                }
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 8)
        .background(theme.surfaceColor)
    }
}

// MARK: - Compact Version (for use in narrow spaces)

struct SportTypePickerCompact: View {
    @Binding var selectedSport: SportType
    @Environment(ThemeManager.self) private var theme

    var body: some View {
        HStack(spacing: 8) {
            ForEach(SportType.allCases) { sport in
                Button {
                    withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                        selectedSport = sport
                        theme.selectedSport = sport
                    }
                } label: {
                    HStack(spacing: 4) {
                        Image(systemName: sport.icon)
                            .font(.system(size: 14))
                        Text(sport.name)
                            .font(.caption)
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(
                        Capsule()
                            .fill(selectedSport == sport ? sport.themeColor : Color.clear)
                    )
                    .overlay(
                        Capsule()
                            .stroke(selectedSport == sport ? sport.themeColor : theme.textTertiary, lineWidth: 1)
                    )
                    .foregroundColor(selectedSport == sport ? .white : theme.textSecondary)
                }
            }
        }
    }
}

// MARK: - Preview

#Preview {
    VStack {
        SportTypePicker(selectedSport: .constant(.snooker))
        SportTypePickerCompact(selectedSport: .constant(.snooker))
    }
    .preferredColorScheme(.dark)
    .environment(ThemeManager())
    .padding()
    .background(Color(hex: "0D1B16"))
}
