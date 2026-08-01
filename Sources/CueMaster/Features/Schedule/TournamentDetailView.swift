import SwiftUI

// MARK: - Tournament Detail View

struct TournamentDetailView: View {
    let tournament: Tournament
    @Environment(ThemeManager.self) private var theme
    @State private var matches: [Match] = []
    @State private var selectedRound: String = "all"

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Hero header
                heroHeader

                // Quick info grid
                quickInfoGrid

                // Defending champion
                if let champion = tournament.defendingChampion {
                    defendingChampionRow(champion)
                }

                // Matches section
                if !matches.isEmpty {
                    matchesSection
                } else {
                    noMatchesYet
                }
            }
        }
        .background(theme.backgroundColor)
        .navigationTitle(tournament.displayName)
        .navigationBarTitleDisplayMode(.inline)
        .onAppear { loadMatches() }
    }

    // MARK: - Hero Header

    private var heroHeader: some View {
        VStack(spacing: 12) {
            // Tournament category badge
            HStack(spacing: 8) {
                Text(tournament.category.label)
                    .font(.caption)
                    .fontWeight(.bold)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 4)
                    .background(tournament.category.color)
                    .clipShape(Capsule())

                // Triple Crown badge
                if tournament.category == .tripleCrown {
                    HStack(spacing: 4) {
                        Image(systemName: "crown.fill")
                            .font(.caption2)
                        Text("三重冠")
                            .font(.caption)
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 4)
                    .background(Color.orange.opacity(0.2))
                    .foregroundColor(.orange)
                    .clipShape(Capsule())
                }

                Spacer()

                statusLabel
            }

            // Name
            Text(tournament.displayName)
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(theme.textPrimary)

            // Location
            HStack(spacing: 6) {
                Image(systemName: "mappin.circle.fill")
                    .foregroundColor(theme.accentColor)
                Text("\(tournament.venue), \(tournament.city), \(tournament.country)")
                    .font(.subheadline)
            }
            .foregroundColor(theme.textSecondary)

            // Date
            HStack(spacing: 4) {
                Image(systemName: "calendar")
                    .font(.caption)
                Text(tournament.dateRangeFormatted)
                    .font(.caption)
            }
            .foregroundColor(theme.textTertiary)
        }
        .padding(20)
        .background(
            LinearGradient(
                colors: [theme.surfaceColor, theme.surfaceColor.opacity(0.7)],
                startPoint: .top,
                endPoint: .bottom
            )
        )
    }

    // MARK: - Quick Info Grid

    private var quickInfoGrid: some View {
        HStack(spacing: 12) {
            InfoCard(
                icon: "trophy.fill",
                label: "总奖金",
                value: tournament.prizeFundFormatted,
                color: theme.accentColor
            )
            InfoCard(
                icon: "calendar.badge.clock",
                label: "赛期",
                value: "\(tournament.daysUntilFormatted)",
                color: theme.primaryColor
            )
            InfoCard(
                icon: "figure.indoor.cycle",
                label: "地点",
                value: tournament.city,
                color: .blue
            )
        }
        .padding(.horizontal)
    }

    // MARK: - Defending Champion

    private func defendingChampionRow(_ champion: String) -> some View {
        HStack {
            Image(systemName: "shield.checkered")
                .foregroundColor(theme.accentColor)
            Text("卫冕冠军")
                .font(.subheadline)
                .foregroundColor(theme.textSecondary)
            Spacer()
            Text(champion)
                .font(.subheadline)
                .fontWeight(.semibold)
                .foregroundColor(theme.accentColor)
        }
        .padding(.horizontal)
        .padding(.vertical, 12)
        .background(theme.surfaceColor)
    }

    // MARK: - Matches Section

    private var matchesSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("比赛对阵")
                .font(.headline)
                .foregroundColor(theme.textPrimary)
                .padding(.horizontal)

            ForEach(matches) { match in
                MatchRow(match: match)
                    .padding(.horizontal)
            }
        }
    }

    private var noMatchesYet: some View {
        VStack(spacing: 12) {
            Image(systemName: "figure.pool.swim")
                .font(.system(size: 40))
                .foregroundColor(theme.textTertiary)
            Text("暂无比赛数据")
                .foregroundColor(theme.textSecondary)
            Text("赛事开始后将实时更新对阵和比分")
                .font(.caption)
                .foregroundColor(theme.textTertiary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 40)
    }

    private var statusLabel: some View {
        switch tournament.status {
        case .live:
            HStack(spacing: 4) {
                Circle().fill(.red).frame(width: 8, height: 8)
                Text("LIVE")
                    .font(.caption)
                    .fontWeight(.bold)
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 4)
            .background(Color.red.opacity(0.15))
            .foregroundColor(.red)
            .clipShape(Capsule())
        case .upcoming:
            Text(tournament.daysUntilFormatted)
                .font(.caption)
                .fontWeight(.medium)
                .padding(.horizontal, 10)
                .padding(.vertical, 4)
                .background(theme.primaryColor.opacity(0.2))
                .foregroundColor(theme.primaryColor)
                .clipShape(Capsule())
        case .completed:
            Text("已结束")
                .font(.caption)
                .padding(.horizontal, 10)
                .padding(.vertical, 4)
                .background(Color.gray.opacity(0.2))
                .foregroundColor(.gray)
                .clipShape(Capsule())
        }
    }

    private func loadMatches() {
        // For MVP: load mock matches relevant to this tournament
        if tournament.id == "wsc-2026" {
            matches = [MockData.sampleMatch1]
        } else if tournament.id == "shanghai-2026" {
            matches = [MockData.sampleMatch2]
        }
    }
}

// MARK: - Info Card

struct InfoCard: View {
    let icon: String
    let label: String
    let value: String
    let color: Color

    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundColor(color)
            Text(value)
                .font(.caption)
                .fontWeight(.bold)
                .foregroundColor(.white)
            Text(label)
                .font(.caption2)
                .foregroundColor(.white.opacity(0.5))
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 14)
        .background(color.opacity(0.12))
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}

// MARK: - Match Row

struct MatchRow: View {
    let match: Match
    @Environment(ThemeManager.self) private var theme

    var body: some View {
        VStack(spacing: 10) {
            // Round label
            HStack {
                Text(match.displayRound)
                    .font(.caption)
                    .foregroundColor(theme.textTertiary)
                Spacer()
                matchStatusBadge
            }

            // Players
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(match.player1.flagEmoji)
                    Text("\(match.player1.firstName) \(match.player1.lastName)")
                        .font(.subheadline)
                        .fontWeight(match.winner?.id == match.player1.id ? .bold : .regular)
                        .foregroundColor(theme.textPrimary)
                }
                Spacer()
                Text(match.scoreDisplay)
                    .font(.title3)
                    .fontWeight(.bold)
                    .foregroundColor(match.isLive ? .red : theme.textPrimary)
                    .padding(.horizontal, 12)
                Spacer()
                VStack(alignment: .trailing, spacing: 4) {
                    Text(match.player2.flagEmoji)
                    Text("\(match.player2.firstName) \(match.player2.lastName)")
                        .font(.subheadline)
                        .fontWeight(match.winner?.id == match.player2.id ? .bold : .regular)
                        .foregroundColor(theme.textPrimary)
                }
            }

            // Table info
            if let table = match.tableNumber {
                HStack {
                    Image(systemName: "tablecells")
                        .font(.caption2)
                    Text("第\(table)号台")
                        .font(.caption2)
                    if let referee = match.referee {
                        Text("· 裁判: \(referee)")
                            .font(.caption2)
                    }
                    Spacer()
                }
                .foregroundColor(theme.textTertiary)
            }
        }
        .padding(14)
        .background(theme.surfaceColor)
        .clipShape(RoundedRectangle(cornerRadius: theme.smallCornerRadius))
    }

    private var matchStatusBadge: some View {
        Text(match.status.label)
            .font(.caption2)
            .fontWeight(.medium)
            .padding(.horizontal, 8)
            .padding(.vertical, 3)
            .background(Color(hex: match.status.color).opacity(0.15))
            .foregroundColor(Color(hex: match.status.color))
            .clipShape(Capsule())
    }
}

// MARK: - Preview

#Preview {
    NavigationStack {
        TournamentDetailView(tournament: MockData.worldChampionship)
            .environment(ThemeManager())
    }
    .preferredColorScheme(.dark)
}
