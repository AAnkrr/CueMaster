import Foundation

// MARK: - Local Cache

final class LocalCache {
    static let shared = LocalCache()

    private let defaults = UserDefaults(suiteName: "group.com.cuemaster.cache")!
    private let encoder = JSONEncoder()
    private let decoder = JSONDecoder()

    private init() {}

    func set<T: Encodable>(_ value: T, for key: String) {
        guard let data = try? encoder.encode(CacheEntry(value: value, timestamp: Date())) else {
            return
        }
        defaults.set(data, forKey: key)
    }

    func get<T: Decodable>(for key: String, maxAge: TimeInterval) -> T? {
        guard let data = defaults.data(forKey: key),
              let entry = try? decoder.decode(CacheEntry<T>.self, from: data),
              Date().timeIntervalSince(entry.timestamp) < maxAge
        else { return nil }
        return entry.value
    }

    func invalidate(_ key: String) {
        defaults.removeObject(forKey: key)
    }

    func invalidateAll() {
        defaults.dictionaryRepresentation().keys
            .filter { $0.hasPrefix("snooker_") }
            .forEach { defaults.removeObject(forKey: $0) }
    }
}

// MARK: - Cache Entry Wrapper

private struct CacheEntry<T: Codable>: Codable {
    let value: T
    let timestamp: Date
}
