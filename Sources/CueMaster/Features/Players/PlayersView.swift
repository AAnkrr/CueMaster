import SwiftUI

// MARK: - Players View

struct PlayersView: View {
    @State private var viewModel = PlayersViewModel()
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

                // Search bar
                searchBar
                    .padding(.horizontal)
                    .padding(.bottom, 8)

                // Filter pills
                filterBar
                    .padding(.horizontal)
                    .padding(.bottom, 12)

                // Player list
                if viewModel.isLoading {
                    loadingView
                } else {
                    playerList
                }
            }
            .background(theme.backgroundColor)
            .navigationTitle("球员")
            .navigationBarTitleDisplayMode(.large)
            .onAppear { viewModel.loadPlayers() }
        }
    }

    // MARK: - Search Bar

    private var searchBar: some View {
        HStack(spacing: 8) {
            Image(systemName: "magnifyingglass")
                .foregroundColor(theme.textTertiary)
            TextField("搜索球员...", text: $viewModel.searchQuery)
                .foregroundColor(theme.textPrimary)
                .onChange(of: viewModel.searchQuery) { _, query in
                    viewModel.search(query)
                }
            if !viewModel.searchQuery.isEmpty {
                Button {
                    viewModel.search("")
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(theme.textTertiary)
                }
            }
        }
        .padding(12)
        .background(theme.surfaceColor)
        .clipShape(RoundedRectangle(cornerRadius: theme.smallCornerRadius))
    }

    // MARK: - Filter Bar

    private var filterBar: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(PlayersViewModel.PlayerFilter.allCases, id: \.rawValue) { filter in
                    FilterChip(
                        label: filter.rawValue,
                        color: theme.primaryColor,
                        isSelected: viewModel.selectedFilter == filter
                    ) {
                        viewModel.setFilter(filter)
                    }
                }
            }
        }
    }

    // MARK: - Player List

    private var playerList: some View {
        ScrollView {
            LazyVStack(spacing: 2) {
                ForEach(viewModel.filteredPlayers) { player in
                    PlayerRow(player: player, isFavorite: viewModel.isFavorite(player)) {
                        viewModel.toggleFavorite(player)
                    }
                }
            }
            .padding(.horizontal)
            .padding(.bottom, 20)
        }
    }

    private var loadingView: some View {
        VStack(spacing: 16) {
            ProgressView()
                .tint(theme.primaryColor)
            Text("加载球员...")
                .foregroundColor(theme.textSecondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 80)
    }
}

// MARK: - Player Row

struct PlayerRow: View {
    let player: Player
    let isFavorite: Bool
    let onFavoriteToggle: () -> Void
    @Environment(ThemeManager.self) private var theme

    var body: some View {
        NavigationLink(destination: PlayerDetailView(player: player)) {
            HStack(spacing: 12) {
                // Rank
                if let rank = player.currentRanking {
                    Text("\(rank)")
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(rank <= 3 ? theme.accentColor : theme.textSecondary)
                        .frame(width: 24, alignment: .center)
                }

                // Avatar
                ZStack {
                    Circle()
                        .fill(theme.primaryColor.opacity(0.2))
                        .frame(width: 40, height: 40)
                    Text(String(player.lastName.prefix(1)))
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(theme.primaryColor)
                }

                // Info
                VStack(alignment: .leading, spacing: 2) {
                    HStack(spacing: 4) {
                        Text(player.flagEmoji)
                            .font(.caption)
                        Text(player.displayName)
                            .font(.subheadline)
                            .fontWeight(.medium)
                            .foregroundColor(theme.textPrimary)
                    }
                    if let zhName = player.nameZh {
                        Text(zhName)
                            .font(.caption2)
                            .foregroundColor(theme.textTertiary)
                    }
                }

                Spacer()

                // Ranking points
                if let points = player.rankingPoints {
                    Text(points.prizeFundFormatted)
                        .font(.caption)
                        .foregroundColor(theme.accentColor)
                        .padding(.trailing, 4)
                }

                // Favorite button
                Button(action: onFavoriteToggle) {
                    Image(systemName: isFavorite ? "star.fill" : "star")
                        .font(.caption)
                        .foregroundColor(isFavorite ? .yellow : theme.textTertiary)
                }
            }
            .padding(.vertical, 12)
            .padding(.horizontal, 10)
        }
        .buttonStyle(.plain)
        .background(theme.backgroundColor)
    }
}

// MARK: - Preview

#Preview {
    PlayersView(selectedSport: .constant(.snooker))
        .environment(ThemeManager())
        .preferredColorScheme(.dark)
}
