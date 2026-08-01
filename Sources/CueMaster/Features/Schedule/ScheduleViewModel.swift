import SwiftUI
import Combine

// MARK: - Schedule ViewModel

@Observable
final class ScheduleViewModel {
    var tournaments: [Tournament] = []
    var filteredTournaments: [Tournament] = []
    var isLoading = false
    var errorMessage: String?
    var selectedSeason: String = "2026/27"
    var selectedCategory: TournamentCategory?
    var selectedSport: SportType = .snooker

    private let repository: SnookerRepositoryProtocol

    init(repository: SnookerRepositoryProtocol = SnookerRepositoryImpl()) {
        self.repository = repository
    }

    var liveTournaments: [Tournament] {
        filteredTournaments.filter { $0.status == .live }
    }

    var upcomingTournaments: [Tournament] {
        filteredTournaments
            .filter { $0.status == .upcoming }
            .sorted { $0.startDate < $1.startDate }
    }

    var completedTournaments: [Tournament] {
        filteredTournaments
            .filter { $0.status == .completed }
            .sorted { $0.endDate > $1.endDate }
    }

    func loadSchedule() {
        isLoading = true
        errorMessage = nil

        // For MVP: use mock data
        // In production: await repository.fetchSchedule(season: 2026)
        tournaments = MockData.scheduledTournaments
        applyFilters()

        isLoading = false
    }

    func applyFilters() {
        var result = tournaments.filter { $0.sportType == selectedSport }

        if let category = selectedCategory {
            result = result.filter { $0.category == category }
        }

        filteredTournaments = result
    }

    func filterByCategory(_ category: TournamentCategory?) {
        selectedCategory = category
        applyFilters()
    }

    func changeSport(_ sport: SportType) {
        selectedSport = sport
        loadSchedule()
    }
}
