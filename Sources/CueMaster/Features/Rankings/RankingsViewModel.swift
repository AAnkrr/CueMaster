import SwiftUI

// MARK: - Rankings ViewModel

@Observable
final class RankingsViewModel {
    var rankingList: RankingList?
    var isLoading = false
    var errorMessage: String?
    var selectedType: RankingType = .official
    var selectedSport: SportType = .snooker

    private let repository: SnookerRepositoryProtocol

    init(repository: SnookerRepositoryProtocol = SnookerRepositoryImpl()) {
        self.repository = repository
    }

    var entries: [RankingEntry] {
        rankingList?.entries ?? []
    }

    var lastUpdatedText: String {
        guard let date = rankingList?.lastUpdated else { return "" }
        let formatter = RelativeDateTimeFormatter()
        formatter.locale = Locale(identifier: "zh_CN")
        return "更新于 " + formatter.localizedString(for: date, relativeTo: Date())
    }

    func loadRankings() {
        isLoading = true
        errorMessage = nil

        // For MVP: use mock data
        rankingList = MockData.worldRankings

        isLoading = false
    }

    func switchType(_ type: RankingType) {
        selectedType = type
        loadRankings()
    }

    func changeSport(_ sport: SportType) {
        selectedSport = sport
        loadRankings()
    }
}
