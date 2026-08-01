import SwiftUI

// MARK: - News ViewModel

@Observable
final class NewsViewModel {
    var newsItems: [NewsItem] = []
    var filteredNews: [NewsItem] = []
    var isLoading = false
    var errorMessage: String?
    var selectedCategory: NewsCategory?
    var selectedLanguage: NewsLanguage = .zh
    var selectedSport: SportType = .snooker

    private let repository: SnookerRepositoryProtocol

    init(repository: SnookerRepositoryProtocol = SnookerRepositoryImpl()) {
        self.repository = repository
    }

    func loadNews() {
        isLoading = true
        errorMessage = nil

        // For MVP: use mock data
        newsItems = MockData.newsItems
        applyFilters()

        isLoading = false
    }

    func applyFilters() {
        var result = newsItems.filter { $0.language == selectedLanguage }

        if let category = selectedCategory {
            result = result.filter { $0.category == category }
        }

        filteredNews = result.sorted { $0.publishedAt > $1.publishedAt }
    }

    func filterByCategory(_ category: NewsCategory?) {
        selectedCategory = category
        applyFilters()
    }

    func changeSport(_ sport: SportType) {
        selectedSport = sport
        loadNews()
    }
}
