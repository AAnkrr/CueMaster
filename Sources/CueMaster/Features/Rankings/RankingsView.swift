import SwiftUI

// MARK: - Rankings View

struct RankingsView: View {
    @State private var viewModel = RankingsViewModel()
    @Environment(ThemeManager.self) private var theme
    @Binding var selectedSport: SportType

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Sport Picker
                SportTypePickerCompact(selectedSport: $selectedSport)
                    .padding(.horizontal)
                    .padding(.bottom, 8)
                    .onChange(of: selectedSport) { _, newValue in
                        viewModel.changeSport(newValue)
                    }

                // Ranking type toggle
                rankingTypeToggle
                    .padding(.horizontal)
                    .padding(.bottom, 12)

                // Content
                if viewModel.isLoading {
                    loadingView
                } else {
                    rankingList
                }
            }
            .background(theme.backgroundColor)
            .navigationTitle("排名")
            .navigationBarTitleDisplayMode(.large)
            .onAppear { viewModel.loadRankings() }
        }
    }

    // MARK: - Ranking Type Toggle

    private var rankingTypeToggle: some View {
        HStack(spacing: 0) {
            ForEach(RankingType.allCases, id: \.rawValue) { type in
                Button {
                    withAnimation(.easeInOut(duration: 0.2)) {
                        viewModel.switchType(type)
                    }
                } label: {
                    Text(type.label)
                        .font(.subheadline)
                        .fontWeight(viewModel.selectedType == type ? .semibold : .regular)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 10)
                        .background(
                            viewModel.selectedType == type
                                ? theme.primaryColor
                                : Color.clear
                        )
                        .foregroundColor(
                            viewModel.selectedType == type
                                ? .white
                                : theme.textSecondary
                        )
                }
            }
        }
        .background(theme.surfaceColor)
        .clipShape(RoundedRectangle(cornerRadius: theme.smallCornerRadius))
    }

    // MARK: - Ranking List

    private var rankingList: some View {
        ScrollView {
            LazyVStack(spacing: 2) {
                // Table header
                HStack(spacing: 8) {
                    Text("#")
                        .font(.caption)
                        .foregroundColor(theme.textTertiary)
                        .frame(width: 28, alignment: .center)
                    Text("球员")
                        .font(.caption)
                        .foregroundColor(theme.textTertiary)
                    Spacer()
                    Text("奖金积分")
                        .font(.caption)
                        .foregroundColor(theme.textTertiary)
                    Text("变动")
                        .font(.caption)
                        .foregroundColor(theme.textTertiary)
                        .frame(width: 36)
                }
                .padding(.horizontal)
                .padding(.vertical, 8)

                ForEach(viewModel.entries) { entry in
                    RankingRow(entry: entry)
                        .padding(.horizontal)
                }
            }
            .padding(.bottom, 20)

            // Last updated
            if !viewModel.lastUpdatedText.isEmpty {
                Text(viewModel.lastUpdatedText)
                    .font(.caption2)
                    .foregroundColor(theme.textTertiary)
                    .padding(.bottom, 20)
            }
        }
    }

    private var loadingView: some View {
        VStack(spacing: 16) {
            ProgressView()
                .tint(theme.primaryColor)
            Text("加载排名...")
                .foregroundColor(theme.textSecondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 80)
    }
}

// MARK: - Ranking Row

struct RankingRow: View {
    let entry: RankingEntry
    @Environment(ThemeManager.self) private var theme

    var body: some View {
        HStack(spacing: 8) {
            // Rank number
            Text("\(entry.rank)")
                .font(.subheadline)
                .fontWeight(.bold)
                .foregroundColor(rankColor)
                .frame(width: 28, alignment: .center)

            // Player info
            HStack(spacing: 10) {
                Text(entry.player.flagEmoji)
                    .font(.title3)
                VStack(alignment: .leading, spacing: 2) {
                    Text("\(entry.player.firstName) \(entry.player.lastName)")
                        .font(.subheadline)
                        .fontWeight(.medium)
                        .foregroundColor(theme.textPrimary)
                    Text(entry.player.nationality)
                        .font(.caption2)
                        .foregroundColor(theme.textTertiary)
                }
            }

            Spacer()

            // Points
            VStack(alignment: .trailing, spacing: 2) {
                Text(entry.pointsFormatted)
                    .font(.caption)
                    .fontWeight(.semibold)
                    .foregroundColor(theme.accentColor)
            }

            // Rank change
            Text(entry.rankChangeFormatted)
                .font(.caption)
                .fontWeight(.semibold)
                .foregroundColor(changeColor)
                .frame(width: 36)
        }
        .padding(.vertical, 12)
        .padding(.horizontal, 12)
        .background(
            entry.rank <= 3
                ? theme.primaryColor.opacity(0.08)
                : Color.clear
        )
        .clipShape(RoundedRectangle(cornerRadius: 8))
        .overlay(
            entry.rank <= 16 ? nil :
            Rectangle()
                .fill(Color.clear)
        )
    }

    private var rankColor: Color {
        switch entry.rank {
        case 1:  return Color(hex: "FFD700")  // Gold
        case 2:  return Color(hex: "C0C0C0")  // Silver
        case 3:  return Color(hex: "CD7F32")  // Bronze
        default: return theme.textSecondary
        }
    }

    private var changeColor: Color {
        guard let change = entry.rankChange else { return theme.textTertiary }
        if change > 0 { return .green }
        if change < 0 { return .red }
        return theme.textTertiary
    }
}

// MARK: - Preview

#Preview {
    RankingsView(selectedSport: .constant(.snooker))
        .environment(ThemeManager())
        .preferredColorScheme(.dark)
}
