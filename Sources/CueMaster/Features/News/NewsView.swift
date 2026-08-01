import SwiftUI

// MARK: - News / Discover View

struct NewsView: View {
    @State private var viewModel = NewsViewModel()
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

                // Category filter
                categoryFilter
                    .padding(.horizontal)
                    .padding(.bottom, 12)

                // Content
                if viewModel.isLoading {
                    loadingView
                } else {
                    newsList
                }
            }
            .background(theme.backgroundColor)
            .navigationTitle("发现")
            .navigationBarTitleDisplayMode(.large)
            .onAppear { viewModel.loadNews() }
        }
    }

    // MARK: - Category Filter

    private var categoryFilter: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                FilterChip(label: "全部", isSelected: viewModel.selectedCategory == nil) {
                    viewModel.filterByCategory(nil)
                }
                ForEach(NewsCategory.allCases, id: \.rawValue) { cat in
                    FilterChip(
                        label: cat.label,
                        color: theme.primaryColor,
                        isSelected: viewModel.selectedCategory == cat
                    ) {
                        viewModel.filterByCategory(cat)
                    }
                }
            }
        }
    }

    // MARK: - News List

    private var newsList: some View {
        ScrollView {
            LazyVStack(spacing: 14) {
                ForEach(viewModel.filteredNews) { item in
                    NewsCard(item: item)
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
            Text("加载新闻...")
                .foregroundColor(theme.textSecondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 80)
    }
}

// MARK: - News Card

struct NewsCard: View {
    let item: NewsItem
    @Environment(ThemeManager.self) private var theme

    var body: some View {
        Button {
            // Open URL in browser or in-app WebView
        } label: {
            VStack(alignment: .leading, spacing: 10) {
                // Category + Source
                HStack(spacing: 8) {
                    Text(item.category.label)
                        .font(.caption2)
                        .fontWeight(.semibold)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 3)
                        .background(theme.primaryColor.opacity(0.2))
                        .foregroundColor(theme.primaryColor)
                        .clipShape(Capsule())

                    Text(item.source.displayName)
                        .font(.caption2)
                        .foregroundColor(theme.textTertiary)

                    Spacer()

                    Text(item.timeAgo)
                        .font(.caption2)
                        .foregroundColor(theme.textTertiary)
                }

                // Title
                Text(item.displayTitle)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .foregroundColor(theme.textPrimary)
                    .lineLimit(3)

                // Summary
                Text(item.summary)
                    .font(.caption)
                    .foregroundColor(theme.textSecondary)
                    .lineLimit(2)
            }
            .padding(14)
            .background(theme.surfaceColor)
            .clipShape(RoundedRectangle(cornerRadius: theme.smallCornerRadius))
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Preview

#Preview {
    NewsView(selectedSport: .constant(.snooker))
        .environment(ThemeManager())
        .preferredColorScheme(.dark)
}
