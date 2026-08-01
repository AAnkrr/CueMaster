import SwiftUI

// MARK: - Profile / Settings View

struct ProfileView: View {
    @Environment(ThemeManager.self) private var theme
    @State private var notificationsEnabled = true
    @State private var matchReminder = true
    @State private var breakingNews = true
    @State private var calendarSync = true
    @State private var selectedLanguage = "zh"

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Header
                    profileHeader

                    // Subscription card
                    subscriptionCard

                    // Settings sections
                    notificationSettings
                    generalSettings
                    aboutSection
                }
                .padding(.horizontal)
                .padding(.bottom, 40)
            }
            .background(theme.backgroundColor)
            .navigationTitle("我的")
            .navigationBarTitleDisplayMode(.large)
        }
    }

    // MARK: - Profile Header

    private var profileHeader: some View {
        HStack(spacing: 14) {
            ZStack {
                Circle()
                    .fill(theme.primaryColor.opacity(0.3))
                    .frame(width: 56, height: 56)
                Image(systemName: "person.fill")
                    .font(.title2)
                    .foregroundColor(theme.primaryColor)
            }

            VStack(alignment: .leading, spacing: 4) {
                Text("登录 / 注册")
                    .font(.headline)
                    .foregroundColor(theme.textPrimary)
                Text("同步数据，解锁更多功能")
                    .font(.caption)
                    .foregroundColor(theme.textSecondary)
            }

            Spacer()

            Image(systemName: "chevron.right")
                .font(.caption)
                .foregroundColor(theme.textTertiary)
        }
        .padding(16)
        .background(theme.surfaceColor)
        .clipShape(RoundedRectangle(cornerRadius: theme.cornerRadius))
    }

    // MARK: - Subscription Card

    private var subscriptionCard: some View {
        VStack(spacing: 14) {
            HStack {
                Image(systemName: "crown.fill")
                    .foregroundColor(theme.accentColor)
                Text("CueMaster Pro")
                    .font(.headline)
                    .foregroundColor(theme.accentColor)
                Spacer()
            }

            Text("解锁全部功能：无广告、无限关注球员、AI 赛事摘要、数据对比、中式八球 & 九球数据")
                .font(.caption)
                .foregroundColor(theme.textSecondary)

            HStack(spacing: 12) {
                ProPlanButton(plan: "月订阅", price: "¥18/月", isRecommended: false) {}
                ProPlanButton(plan: "年订阅", price: "¥128/年", isRecommended: true) {}
            }
        }
        .padding(16)
        .background(
            LinearGradient(
                colors: [theme.accentColor.opacity(0.15), theme.surfaceColor],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
        .clipShape(RoundedRectangle(cornerRadius: theme.cornerRadius))
        .overlay(
            RoundedRectangle(cornerRadius: theme.cornerRadius)
                .stroke(theme.accentColor.opacity(0.3), lineWidth: 1)
        )
    }

    // MARK: - Notification Settings

    private var notificationSettings: some View {
        VStack(alignment: .leading, spacing: 6) {
            SectionHeader(title: "通知", icon: "bell.fill")
                .padding(.bottom, 4)

            VStack(spacing: 0) {
                ToggleRow(icon: "bell.badge", label: "推送通知", isOn: $notificationsEnabled)
                Divider().background(theme.textTertiary.opacity(0.15))
                ToggleRow(icon: "timer", label: "比赛提醒", isOn: $matchReminder)
                Divider().background(theme.textTertiary.opacity(0.15))
                ToggleRow(icon: "newspaper", label: "重大新闻推送", isOn: $breakingNews)
            }
            .padding(14)
            .background(theme.surfaceColor)
            .clipShape(RoundedRectangle(cornerRadius: theme.smallCornerRadius))
        }
    }

    // MARK: - General Settings

    private var generalSettings: some View {
        VStack(alignment: .leading, spacing: 6) {
            SectionHeader(title: "通用", icon: "gearshape.fill")
                .padding(.bottom, 4)

            VStack(spacing: 0) {
                ToggleRow(icon: "calendar.badge.plus", label: "日历同步", isOn: $calendarSync)
                Divider().background(theme.textTertiary.opacity(0.15))
                HStack {
                    Image(systemName: "globe")
                        .foregroundColor(theme.primaryColor)
                        .frame(width: 24)
                    Text("语言")
                        .foregroundColor(theme.textPrimary)
                    Spacer()
                    Picker("", selection: $selectedLanguage) {
                        Text("简体中文").tag("zh")
                        Text("繁體中文").tag("zh_HK")
                        Text("English").tag("en")
                    }
                    .tint(theme.textSecondary)
                }
                .padding(.vertical, 12)
            }
            .padding(14)
            .background(theme.surfaceColor)
            .clipShape(RoundedRectangle(cornerRadius: theme.smallCornerRadius))
        }
    }

    // MARK: - About

    private var aboutSection: some View {
        VStack(alignment: .leading, spacing: 6) {
            SectionHeader(title: "关于", icon: "info.circle.fill")
                .padding(.bottom, 4)

            VStack(spacing: 0) {
                AboutRow(label: "版本", value: "1.0.0 (MVP)")
                Divider().background(theme.textTertiary.opacity(0.15))
                AboutRow(label: "数据来源", value: "WST / api.snooker.org")
                Divider().background(theme.textTertiary.opacity(0.15))
                AboutRow(label: "反馈建议", value: "📧 cuemaster@feedback.com")
            }
            .padding(14)
            .background(theme.surfaceColor)
            .clipShape(RoundedRectangle(cornerRadius: theme.smallCornerRadius))

            Text("CueMaster 并非 World Snooker Tour 官方应用。所有赛事数据和球员信息均来源于公开数据。")
                .font(.caption2)
                .foregroundColor(theme.textTertiary)
                .padding(.top, 8)
        }
    }
}

// MARK: - Subcomponents

struct SectionHeader: View {
    let title: String
    let icon: String
    @Environment(ThemeManager.self) private var theme

    var body: some View {
        HStack(spacing: 6) {
            Image(systemName: icon)
                .font(.caption)
                .foregroundColor(theme.primaryColor)
            Text(title)
                .font(.caption)
                .fontWeight(.semibold)
                .foregroundColor(theme.textSecondary)
                .textCase(.uppercase)
        }
    }
}

struct ToggleRow: View {
    let icon: String
    let label: String
    @Binding var isOn: Bool
    @Environment(ThemeManager.self) private var theme

    var body: some View {
        HStack {
            Image(systemName: icon)
                .foregroundColor(theme.primaryColor)
                .frame(width: 24)
            Text(label)
                .foregroundColor(theme.textPrimary)
            Spacer()
            Toggle("", isOn: $isOn)
                .tint(theme.primaryColor)
        }
        .padding(.vertical, 4)
    }
}

struct AboutRow: View {
    let label: String
    let value: String
    @Environment(ThemeManager.self) private var theme

    var body: some View {
        HStack {
            Text(label)
                .font(.subheadline)
                .foregroundColor(theme.textSecondary)
            Spacer()
            Text(value)
                .font(.subheadline)
                .foregroundColor(theme.textPrimary)
        }
        .padding(.vertical, 10)
    }
}

struct ProPlanButton: View {
    let plan: String
    let price: String
    let isRecommended: Bool
    let action: () -> Void
    @Environment(ThemeManager.self) private var theme

    var body: some View {
        Button(action: action) {
            VStack(spacing: 4) {
                if isRecommended {
                    Text("推荐")
                        .font(.system(size: 9))
                        .fontWeight(.bold)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(Color.orange)
                        .foregroundColor(.white)
                        .clipShape(Capsule())
                }
                Text(plan)
                    .font(.caption)
                    .fontWeight(.medium)
                Text(price)
                    .font(.caption)
                    .fontWeight(.bold)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 10)
            .background(
                isRecommended
                    ? theme.accentColor.opacity(0.25)
                    : Color.white.opacity(0.05)
            )
            .clipShape(RoundedRectangle(cornerRadius: theme.smallCornerRadius))
            .overlay(
                RoundedRectangle(cornerRadius: theme.smallCornerRadius)
                    .stroke(
                        isRecommended ? theme.accentColor : Color.white.opacity(0.15),
                        lineWidth: isRecommended ? 1.5 : 1
                    )
            )
        }
    }
}

// MARK: - Preview

#Preview {
    ProfileView()
        .environment(ThemeManager())
        .preferredColorScheme(.dark)
}
