import SwiftUI

@main
struct CueMasterApp: App {
    @State private var themeManager = ThemeManager()
    @State private var selectedSport: SportType = .snooker

    var body: some Scene {
        WindowGroup {
            MainTabView(selectedSport: $selectedSport)
                .environment(themeManager)
                .preferredColorScheme(.dark)
                .tint(selectedSport.themeColor)
        }
    }
}
