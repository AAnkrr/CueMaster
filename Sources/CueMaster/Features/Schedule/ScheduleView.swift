import SwiftUI

// MARK: - Schedule View

struct ScheduleView: View {
    @State private var viewModel = ScheduleViewModel()
    @Environment(ThemeManager.self) private var theme
    @Binding var selectedSport: SportType

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 0) {
                    // Sport Picker
                    SportTypePickerCompact(selectedSport: $selectedSport)
                        .padding(.horizontal)
                        .padding(.bottom, 12)
                        .onChange(of: selectedSport) { _, newValue in
                            viewModel.changeSport(newValue)
                        }

                    // Category Filter Pills
                    categoryFilterBar
                        .padding(.horizontal)
                        .padding(.bottom, 16)

                    // Content
                    if viewModel.isLoading {
                        loadingView
                    } else {
                        contentSections
                    }
                }
            }
            .background(theme.backgroundColor)
            .navigationTitle("赛程")
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    seasonPicker
                }
            }
            .onAppear { viewModel.loadSchedule() }
        }
    }

    // MARK: - Category Filter

    private var categoryFilterBar: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                FilterChip(label: "全部", isSelected: viewModel.selectedCategory == nil) {
                    viewModel.filterByCategory(nil)
                }
                ForEach([TournamentCategory.tripleCrown, .ranking, .invitational], id: \.rawValue) { cat in
                    FilterChip(
                        label: cat.label,
                        color: cat.color,
                        isSelected: viewModel.selectedCategory == cat
                    ) {
                        viewModel.filterByCategory(cat)
                    }
                }
            }
            .padding(.vertical, 4)
        }
    }

    // MARK: - Content Sections

    private var contentSections: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Live section
            if !viewModel.liveTournaments.isEmpty {
                sectionHeader("● 进行中", color: .red)
                ForEach(viewModel.liveTournaments) { tournament in
                    TournamentCard(tournament: tournament)
                }
            }

            // Upcoming section
            if !viewModel.upcomingTournaments.isEmpty {
                sectionHeader("📅 即将到来", color: theme.accentColor)
                ForEach(viewModel.upcomingTournaments) { tournament in
                    TournamentCard(tournament: tournament)
                }
            }

            // Completed section
            if !viewModel.completedTournaments.isEmpty {
                sectionHeader("✓ 已结束", color: .gray)
                ForEach(viewModel.completedTournaments) { tournament in
                    TournamentCard(tournament: tournament, compact: true)
                }
            }
        }
        .padding(.horizontal)
    }

    private func sectionHeader(_ title: String, color: Color) -> some View {
        Text(title)
            .font(.headline)
            .foregroundColor(color)
            .padding(.top, 8)
    }

    // MARK: - Season Picker

    private var seasonPicker: some View {
        Menu {
            ForEach(["2026/27", "2025/26", "2024/25"], id: \.self) { season in
                Button(season) {
                    viewModel.selectedSeason = season
                    viewModel.loadSchedule()
                }
            }
        } label: {
            HStack(spacing: 4) {
                Text(viewModel.selectedSeason)
                Image(systemName: "chevron.down")
            }
            .font(.subheadline)
            .foregroundColor(theme.textSecondary)
        }
    }

    private var loadingView: some View {
        VStack(spacing: 16) {
            ProgressView()
                .tint(theme.primaryColor)
            Text("加载赛程...")
                .foregroundColor(theme.textSecondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 80)
    }
}

// MARK: - Tournament Card

struct TournamentCard: View {
    let tournament: Tournament
    var compact: Bool = false
    @Environment(ThemeManager.self) private var theme

    var body: some View {
        NavigationLink(destination: TournamentDetailView(tournament: tournament)) {
            HStack(alignment: .top, spacing: 14) {
                // Left: category indicator
                RoundedRectangle(cornerRadius: 4)
                    .fill(tournament.category.color)
                    .frame(width: 4)
                    .frame(minHeight: compact ? 60 : 80)

                // Center: info
                VStack(alignment: .leading, spacing: 6) {
                    HStack(spacing: 8) {
                        // Category badge
                        Text(tournament.category.label)
                            .font(.caption2)
                            .fontWeight(.semibold)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(tournament.category.color.opacity(0.2))
                            .foregroundColor(tournament.category.color)
                            .clipShape(Capsule())

                        // Prize fund
                        if !compact {
                            Text(tournament.prizeFundFormatted)
                                .font(.caption2)
                                .foregroundColor(theme.accentColor)
                        }
                    }

                    Text(tournament.displayName)
                        .font(.headline)
                        .fontWeight(.semibold)
                        .foregroundColor(theme.textPrimary)
                        .lineLimit(2)

                    if !compact {
                        HStack(spacing: 4) {
                            Image(systemName: "mappin.and.ellipse")
                                .font(.caption2)
                            Text("\(tournament.city), \(tournament.country)")
                                .font(.caption)
                        }
                        .foregroundColor(theme.textSecondary)
                    }

                    HStack(spacing: 8) {
                        Text(tournament.dateRangeFormatted)
                            .font(.caption)
                            .foregroundColor(theme.textSecondary)

                        Spacer()

                        // Status / Countdown
                        statusBadge
                    }
                }

                Spacer()
            }
            .padding(theme.cardPadding)
            .background(theme.surfaceColor)
            .clipShape(RoundedRectangle(cornerRadius: theme.cornerRadius))
        }
        .buttonStyle(.plain)
    }

    private var statusBadge: some View {
        Group {
            switch tournament.status {
            case .live:
                HStack(spacing: 4) {
                    Circle().fill(.red).frame(width: 6, height: 6)
                    Text("进行中")
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(.red)
                }
            case .upcoming:
                Text(tournament.daysUntilFormatted)
                    .font(.caption)
                    .fontWeight(.medium)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(theme.primaryColor.opacity(0.2))
                    .foregroundColor(theme.primaryColor)
                    .clipShape(Capsule())
            case .completed:
                Text("已结束")
                    .font(.caption)
                    .foregroundColor(theme.textTertiary)
            }
        }
    }
}

// MARK: - Filter Chip

struct FilterChip: View {
    let label: String
    var color: Color = .gray
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(label)
                .font(.caption)
                .fontWeight(isSelected ? .semibold : .regular)
                .padding(.horizontal, 14)
                .padding(.vertical, 8)
                .background(
                    Capsule()
                        .fill(isSelected ? color.opacity(0.2) : Color.white.opacity(0.05))
                )
                .overlay(
                    Capsule()
                        .stroke(isSelected ? color : Color.white.opacity(0.15), lineWidth: 1)
                )
                .foregroundColor(isSelected ? color : .white.opacity(0.7))
        }
    }
}

// MARK: - Preview

#Preview {
    ScheduleView(selectedSport: .constant(.snooker))
        .environment(ThemeManager())
        .preferredColorScheme(.dark)
}
