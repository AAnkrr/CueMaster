import SwiftUI

// MARK: - Player Detail View

struct PlayerDetailView: View {
    let player: Player
    @Environment(ThemeManager.self) private var theme
    @State private var stats: PlayerSeasonStats?

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Hero header
                playerHero

                // Ranking summary cards
                rankingCards

                // Season stats
                if let stats = stats {
                    seasonStatsSection(stats)
                }

                // Career info
                careerInfoSection

                // Recent matches placeholder
                recentMatchesSection
            }
        }
        .background(theme.backgroundColor)
        .navigationTitle(player.displayNameLocalized)
        .navigationBarTitleDisplayMode(.inline)
        .onAppear { loadStats() }
    }

    // MARK: - Player Hero

    private var playerHero: some View {
        VStack(spacing: 16) {
            // Avatar placeholder
            ZStack {
                Circle()
                    .fill(theme.primaryColor.opacity(0.3))
                    .frame(width: 80, height: 80)
                Text(String(player.lastName.prefix(1)))
                    .font(.system(size: 32, weight: .bold))
                    .foregroundColor(theme.primaryColor)
            }

            // Name
            VStack(spacing: 4) {
                Text(player.displayName)
                    .font(.title3)
                    .fontWeight(.bold)
                if let zhName = player.nameZh {
                    Text(zhName)
                        .font(.subheadline)
                        .foregroundColor(theme.textSecondary)
                }
            }

            // Nationality
            HStack(spacing: 6) {
                Text(player.flagEmoji)
                    .font(.title2)
                Text(player.nationalityZh)
                    .font(.subheadline)
                    .foregroundColor(theme.textSecondary)
            }

            // Ranking badge
            if let rank = player.currentRanking {
                HStack(spacing: 4) {
                    Image(systemName: "trophy.fill")
                        .font(.caption)
                        .foregroundColor(theme.accentColor)
                    Text("世界第\(rank)位")
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundColor(theme.accentColor)
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .background(theme.accentColor.opacity(0.15))
                .clipShape(Capsule())
            }
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 24)
        .background(theme.surfaceColor)
    }

    // MARK: - Ranking Cards

    private var rankingCards: some View {
        HStack(spacing: 12) {
            StatCard(
                label: "当前排名",
                value: player.currentRanking.map { "No.\($0)" } ?? "-",
                icon: "flag.checkered",
                color: theme.primaryColor
            )
            StatCard(
                label: "最高排名",
                value: "No.\(player.highestRanking)",
                icon: "arrow.up.circle.fill",
                color: .green
            )
            StatCard(
                label: "转职业",
                value: "\(player.turnedPro)",
                icon: "calendar.badge.plus",
                color: .blue
            )
        }
        .padding(.horizontal)
    }

    // MARK: - Season Stats

    private func seasonStatsSection(_ stats: PlayerSeasonStats) -> some View {
        VStack(alignment: .leading, spacing: 14) {
            Text("2025/26 赛季数据")
                .font(.headline)
                .foregroundColor(theme.textPrimary)
                .padding(.horizontal)

            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                StatItem(label: "参赛", value: "\(stats.matchesPlayed)")
                StatItem(label: "胜场", value: "\(stats.matchesWon)")
                StatItem(label: "胜率", value: stats.winRateFormatted)
                StatItem(label: "破百", value: "\(stats.centuries)")
                StatItem(label: "最高分", value: stats.highestBreak == 147 ? "147 🔥" : "\(stats.highestBreak)")
                StatItem(label: "奖金", value: stats.prizeMoneyEarned.prizeFundFormatted)
            }
            .padding(.horizontal)
        }
        .padding(.vertical, 14)
        .background(theme.surfaceColor)
    }

    // MARK: - Career Info

    private var careerInfoSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("职业生涯")
                .font(.headline)
                .foregroundColor(theme.textPrimary)

            VStack(spacing: 0) {
                CareerRow(label: "国籍", value: "\(player.flagEmoji) \(player.nationalityZh)")
                Divider().background(theme.textTertiary.opacity(0.2))
                CareerRow(label: "转职业", value: "\(player.turnedPro)年")
                Divider().background(theme.textTertiary.opacity(0.2))
                CareerRow(label: "最高排名", value: "世界第\(player.highestRanking)位")
            }
            .padding(14)
            .background(theme.surfaceColor)
            .clipShape(RoundedRectangle(cornerRadius: theme.smallCornerRadius))
        }
        .padding(.horizontal)
    }

    // MARK: - Recent Matches

    private var recentMatchesSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("近期比赛")
                .font(.headline)
                .foregroundColor(theme.textPrimary)

            VStack(spacing: 8) {
                // Sample recent match
                RecentMatchRow(
                    tournament: "世锦赛 决赛",
                    opponent: "Judd Trump",
                    result: "15-18",
                    outcome: .lost,
                    date: "2026-05-04"
                )
                RecentMatchRow(
                    tournament: "世锦赛 半决赛",
                    opponent: "Neil Robertson",
                    result: "17-12",
                    outcome: .won,
                    date: "2026-05-02"
                )
                RecentMatchRow(
                    tournament: "世锦赛 1/4决赛",
                    opponent: "Mark Selby",
                    result: "13-10",
                    outcome: .won,
                    date: "2026-04-28"
                )
            }
            .padding(14)
            .background(theme.surfaceColor)
            .clipShape(RoundedRectangle(cornerRadius: theme.smallCornerRadius))
        }
        .padding(.horizontal)
        .padding(.bottom, 30)
    }

    private func loadStats() {
        // For MVP: load mock stats
        if player.id == "3" {
            stats = MockData.zhaoSeasonStats
        } else if player.id == "1" {
            stats = MockData.trumpSeasonStats
        }
    }
}

// MARK: - Subcomponents

struct StatCard: View {
    let label: String
    let value: String
    let icon: String
    let color: Color

    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundColor(color)
            Text(value)
                .font(.title3)
                .fontWeight(.bold)
                .foregroundColor(.white)
            Text(label)
                .font(.caption2)
                .foregroundColor(.white.opacity(0.5))
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 16)
        .background(color.opacity(0.1))
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}

struct StatItem: View {
    let label: String
    let value: String
    @Environment(ThemeManager.self) private var theme

    var body: some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.subheadline)
                .fontWeight(.bold)
                .foregroundColor(theme.textPrimary)
            Text(label)
                .font(.caption2)
                .foregroundColor(theme.textTertiary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 10)
        .background(theme.backgroundColor)
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }
}

struct CareerRow: View {
    let label: String
    let value: String
    @Environment(ThemeManager.self) private var theme

    var body: some View {
        HStack {
            Text(label)
                .font(.subheadline)
                .foregroundColor(theme.textSecondary)
            Spacer()
            Text(value)
                .font(.subheadline)
                .foregroundColor(theme.textPrimary)
        }
        .padding(.vertical, 10)
    }
}

struct RecentMatchRow: View {
    let tournament: String
    let opponent: String
    let result: String
    let outcome: MatchOutcome
    let date: String
    @Environment(ThemeManager.self) private var theme

    enum MatchOutcome { case won, lost, draw }

    var body: some View {
        HStack(spacing: 12) {
            // Outcome indicator
            Circle()
                .fill(outcome == .won ? Color.green : Color.red)
                .frame(width: 8, height: 8)

            VStack(alignment: .leading, spacing: 2) {
                Text(tournament)
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundColor(theme.textPrimary)
                Text("vs \(opponent)")
                    .font(.caption2)
                    .foregroundColor(theme.textSecondary)
            }

            Spacer()

            Text(result)
                .font(.caption)
                .fontWeight(.bold)
                .foregroundColor(outcome == .won ? .green : .red)

            Text(date)
                .font(.caption2)
                .foregroundColor(theme.textTertiary)
                .frame(width: 80, alignment: .trailing)
        }
    }
}

// MARK: - Preview

#Preview {
    NavigationStack {
        PlayerDetailView(player: MockData.zhaoXintong)
            .environment(ThemeManager())
    }
    .preferredColorScheme(.dark)
}
