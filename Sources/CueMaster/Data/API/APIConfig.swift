import Foundation

// MARK: - API Configuration

enum APIConfig {
    /// Free snooker data API (no auth required)
    static let snookerBaseURL = "http://api.snooker.org/"

    /// Rate limit: 10 requests per minute
    static let rateLimitPerMinute = 10

    /// Custom header required by api.snooker.org
    static let userAgentHeader = "X-Requested-By"

    /// App identifier for API requests
    static let appIdentifier = "CueMaster-iOS/1.0"

    /// Cache durations
    enum CacheDuration {
        static let schedule: TimeInterval    = 6 * 3600      // 6 hours
        static let rankings: TimeInterval    = 3600           // 1 hour
        static let liveScores: TimeInterval  = 60             // 1 minute (live mode)
        static let news: TimeInterval        = 30 * 60        // 30 minutes
        static let players: TimeInterval     = 24 * 3600      // 24 hours
    }
}

// MARK: - API Endpoints

enum SnookerEndpoint {
    /// Get all events for a season
    /// - Parameter season: e.g. 2025
    static func events(season: Int) -> String {
        "?t=5&s=\(season)"
    }

    /// Get matches for a specific event
    /// - Parameter eventId: Event identifier
    static func matches(eventId: Int) -> String {
        "?e=\(eventId)"
    }

    /// Get ongoing matches
    static var liveMatches: String {
        "?t=4"   // type 4 = live scores
    }

    /// Get player info
    /// - Parameter playerId: Player identifier
    static func player(playerId: Int) -> String {
        "?p=\(playerId)"
    }

    /// Get rankings
    /// - Parameter season: e.g. 2025
    static func rankings(season: Int) -> String {
        "?rt=MoneyRankings&s=\(season)"
    }

    /// Search players by name
    /// - Parameter query: Search string
    static func searchPlayers(query: String) -> String {
        "?t=10&q=\(query.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? query)"
    }
}
