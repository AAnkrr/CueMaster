import SwiftUI

// MARK: - Players ViewModel

@Observable
final class PlayersViewModel {
    var players: [Player] = []
    var favoritePlayers: [Player] = []
    var filteredPlayers: [Player] = []
    var isLoading = false
    var errorMessage: String?
    var searchQuery: String = ""
    var selectedFilter: PlayerFilter = .all
    var selectedSport: SportType = .snooker

    private let repository: SnookerRepositoryProtocol

    enum PlayerFilter: String, CaseIterable {
        case all       = "全部"
        case top16     = "Top 16"
        case chinese   = "中国球员"
        case favorites = "我的关注"
    }

    init(repository: SnookerRepositoryProtocol = SnookerRepositoryImpl()) {
        self.repository = repository
    }

    func loadPlayers() {
        isLoading = true
        errorMessage = nil

        // For MVP: use mock data
        players = MockData.allPlayers
        applyFilters()

        isLoading = false
    }

    func applyFilters() {
        var result = players

        // Search
        if !searchQuery.isEmpty {
            result = result.filter {
                $0.displayName.localizedCaseInsensitiveContains(searchQuery) ||
                ($0.nameZh ?? "").localizedCaseInsensitiveContains(searchQuery)
            }
        }

        // Filter
        switch selectedFilter {
        case .all: break
        case .top16:
            result = result.filter { ($0.currentRanking ?? 99) <= 16 }
        case .chinese:
            result = result.filter { $0.nationality == "CHN" }
        case .favorites:
            result = favoritePlayers
        }

        // Sort by ranking
        result.sort { ($0.currentRanking ?? 999) < ($1.currentRanking ?? 999) }

        filteredPlayers = result
    }

    func search(_ query: String) {
        searchQuery = query
        applyFilters()
    }

    func setFilter(_ filter: PlayerFilter) {
        selectedFilter = filter
        applyFilters()
    }

    func toggleFavorite(_ player: Player) {
        if let idx = favoritePlayers.firstIndex(where: { $0.id == player.id }) {
            favoritePlayers.remove(at: idx)
        } else {
            // Pro users: unlimited; Free users: max 3
            if favoritePlayers.count < 3 {
                favoritePlayers.append(player)
            }
        }
        applyFilters()
    }

    func isFavorite(_ player: Player) -> Bool {
        favoritePlayers.contains(where: { $0.id == player.id })
    }

    func changeSport(_ sport: SportType) {
        selectedSport = sport
        loadPlayers()
    }
}
