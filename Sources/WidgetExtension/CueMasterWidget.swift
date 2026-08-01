import WidgetKit
import SwiftUI

// MARK: - Widget Timeline Entry

struct WidgetEntry: TimelineEntry {
    let date: Date
    let nextTournamentName: String
    let nextTournamentDate: String
    let daysUntil: Int
    let topPlayers: [(String, Int)] // name, rank (top 3)
}

// MARK: - Widget Provider

struct CueMasterProvider: TimelineProvider {
    func placeholder(in context: Context) -> WidgetEntry {
        WidgetEntry(
            date: Date(),
            nextTournamentName: "上海大师赛",
            nextTournamentDate: "7月28日",
            daysUntil: 361,
            topPlayers: [("J.Trump", 1), ("N.Robertson", 2), ("赵心童", 3)]
        )
    }

    func getSnapshot(in context: Context, completion: @escaping (WidgetEntry) -> Void) {
        completion(placeholder(in: context))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<WidgetEntry>) -> Void) {
        // In production: fetch real data from shared UserDefaults cache
        let entry = placeholder(in: context)
        let nextRefresh = Calendar.current.date(byAdding: .hour, value: 3, to: Date())!
        let timeline = Timeline(entries: [entry], policy: .after(nextRefresh))
        completion(timeline)
    }
}

// MARK: - Widget Views

struct SmallWidgetView: View {
    let entry: WidgetEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            // Top 3 ranking
            ForEach(entry.topPlayers.prefix(3), id: \.0) { player in
                HStack(spacing: 4) {
                    Text("\(player.1)")
                        .font(.system(size: 11, weight: .bold))
                        .foregroundColor(player.1 == 1 ? Color(hex: "FFD700") : .white.opacity(0.6))
                    Text(player.0)
                        .font(.system(size: 10))
                        .foregroundColor(.white.opacity(0.8))
                        .lineLimit(1)
                }
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .padding(12)
        .background(Color(hex: "0D1B16"))
    }
}

struct MediumWidgetView: View {
    let entry: WidgetEntry

    var body: some View {
        HStack(spacing: 12) {
            // Left: Next tournament
            VStack(alignment: .leading, spacing: 6) {
                Text("下一站")
                    .font(.caption2)
                    .foregroundColor(Color(hex: "C8A951"))
                Text(entry.nextTournamentName)
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                Text(entry.nextTournamentDate)
                    .font(.caption2)
                    .foregroundColor(.white.opacity(0.5))
                Text("\(entry.daysUntil)天后")
                    .font(.system(size: 18, weight: .bold))
                    .foregroundColor(Color(hex: "1B7A4A"))
            }

            Spacer()

            // Right: Top rankings
            VStack(alignment: .leading, spacing: 3) {
                ForEach(entry.topPlayers.prefix(3), id: \.0) { player in
                    HStack(spacing: 4) {
                        Text("No.\(player.1)")
                            .font(.system(size: 9, weight: .bold))
                            .foregroundColor(player.1 == 1 ? Color(hex: "FFD700") : .white.opacity(0.5))
                        Text(player.0)
                            .font(.system(size: 10))
                            .foregroundColor(.white.opacity(0.8))
                    }
                }
            }
        }
        .padding(14)
        .background(Color(hex: "0D1B16"))
    }
}

struct LargeWidgetView: View {
    let entry: WidgetEntry

    var body: some View {
        VStack(spacing: 10) {
            // Next tournament banner
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text("🏆 下一站赛事")
                        .font(.caption2)
                        .foregroundColor(Color(hex: "C8A951"))
                    Text(entry.nextTournamentName)
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                }
                Spacer()
                Text("\(entry.daysUntil)天")
                    .font(.title3)
                    .fontWeight(.bold)
                    .foregroundColor(Color(hex: "1B7A4A"))
            }

            Divider()
                .background(Color.white.opacity(0.1))

            // Rankings
            HStack {
                Text("世界排名")
                    .font(.caption2)
                    .foregroundColor(.white.opacity(0.5))
                Spacer()
            }
            ForEach(entry.topPlayers.prefix(5), id: \.0) { player in
                HStack {
                    Text("\(player.1)")
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(player.1 <= 3 ? Color(hex: "FFD700") : .white.opacity(0.6))
                    Text(player.0)
                        .font(.caption)
                        .foregroundColor(.white.opacity(0.8))
                    Spacer()
                }
            }
        }
        .padding(16)
        .background(Color(hex: "0D1B16"))
    }
}

// MARK: - Widget Entry Point

struct CueMasterWidget: Widget {
    let kind: String = "CueMasterWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: CueMasterProvider()) { entry in
            CueMasterWidgetEntryView(entry: entry)
                .containerBackground(.fill.tertiary, for: .widget)
        }
        .configurationDisplayName("CueMaster 斯诺克")
        .description("快速查看下一站赛事和最新世界排名")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
    }
}

struct CueMasterWidgetEntryView: View {
    @Environment(\.widgetFamily) var family
    let entry: WidgetEntry

    var body: some View {
        switch family {
        case .systemSmall:
            SmallWidgetView(entry: entry)
        case .systemMedium:
            MediumWidgetView(entry: entry)
        case .systemLarge:
            LargeWidgetView(entry: entry)
        @unknown default:
            SmallWidgetView(entry: entry)
        }
    }
}

// MARK: - Preview

#Preview(as: .systemSmall) {
    CueMasterWidget()
} timeline: {
    WidgetEntry(
        date: Date(),
        nextTournamentName: "上海大师赛",
        nextTournamentDate: "7月28日",
        daysUntil: 361,
        topPlayers: [("J.Trump", 1), ("N.Robertson", 2), ("赵心童", 3)]
    )
}

#Preview(as: .systemMedium) {
    CueMasterWidget()
} timeline: {
    WidgetEntry(
        date: Date(),
        nextTournamentName: "上海大师赛",
        nextTournamentDate: "7月28日",
        daysUntil: 361,
        topPlayers: [("J.Trump", 1), ("N.Robertson", 2), ("赵心童", 3)]
    )
}

#Preview(as: .systemLarge) {
    CueMasterWidget()
} timeline: {
    WidgetEntry(
        date: Date(),
        nextTournamentName: "上海大师赛",
        nextTournamentDate: "7月28日",
        daysUntil: 361,
        topPlayers: [("J.Trump", 1), ("N.Robertson", 2), ("赵心童", 3), ("吴宜泽", 4), ("J.Higgins", 5)]
    )
}
