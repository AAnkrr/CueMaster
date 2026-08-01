import SwiftUI

// MARK: - Main Tab View

struct MainTabView: View {
    @Binding var selectedSport: SportType
    @Environment(ThemeManager.self) private var theme

    var body: some View {
        TabView {
            ScheduleView(selectedSport: $selectedSport)
                .tabItem {
                    Image(systemName: "calendar")
                    Text("赛程")
                }

            RankingsView(selectedSport: $selectedSport)
                .tabItem {
                    Image(systemName: "list.number")
                    Text("排名")
                }

            PlayersView(selectedSport: $selectedSport)
                .tabItem {
                    Image(systemName: "person.2.fill")
                    Text("球员")
                }

            NewsView(selectedSport: $selectedSport)
                .tabItem {
                    Image(systemName: "newspaper.fill")
                    Text("发现")
                }

            ProfileView()
                .tabItem {
                    Image(systemName: "person.circle.fill")
                    Text("我的")
                }
        }
        .tint(selectedSport.themeColor)
        .preferredColorScheme(.dark)
    }
}

// MARK: - Preview

#Preview {
    MainTabView(selectedSport: .constant(.snooker))
        .environment(ThemeManager())
}
