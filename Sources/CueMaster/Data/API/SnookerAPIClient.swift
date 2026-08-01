import Foundation

// MARK: - API Error

enum APIError: LocalizedError {
    case invalidURL
    case requestFailed(Int)
    case decodingFailed(String)
    case rateLimited
    case networkUnavailable
    case cacheExpired

    var errorDescription: String? {
        switch self {
        case .invalidURL:          return "无效的请求地址"
        case .requestFailed(let c): return "请求失败 (\(c))"
        case .decodingFailed(let m): return "数据解析失败: \(m)"
        case .rateLimited:          return "请求过于频繁，请稍候"
        case .networkUnavailable:   return "网络不可用"
        case .cacheExpired:         return "缓存已过期"
        }
    }
}

// MARK: - Snooker API Client

final class SnookerAPIClient {
    static let shared = SnookerAPIClient()

    private let session: URLSession
    private let decoder: JSONDecoder
    private let cache: LocalCache
    private var lastRequestTime: Date?
    private let minimumInterval: TimeInterval = 6.0  // 10 req/min

    private init() {
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = 30
        config.httpAdditionalHeaders = [
            APIConfig.userAgentHeader: APIConfig.appIdentifier
        ]
        self.session = URLSession(configuration: config)
        self.decoder = JSONDecoder()
        self.decoder.keyDecodingStrategy = .useDefaultKeys
        self.cache = LocalCache.shared
    }

    // MARK: - Rate-Limited Request

    func fetch<T: Decodable>(
        endpoint: String,
        cacheKey: String? = nil,
        cacheDuration: TimeInterval? = nil,
        as type: T.Type
    ) async throws -> T {
        // Check cache first
        if let key = cacheKey, let duration = cacheDuration {
            if let cached: T = cache.get(for: key, maxAge: duration) {
                return cached
            }
        }

        // Rate limiting
        if let last = lastRequestTime {
            let elapsed = Date().timeIntervalSince(last)
            if elapsed < minimumInterval {
                try await Task.sleep(nanoseconds: UInt64((minimumInterval - elapsed) * 1_000_000_000))
            }
        }

        let urlString = APIConfig.snookerBaseURL + endpoint
        guard let url = URL(string: urlString) else {
            throw APIError.invalidURL
        }

        lastRequestTime = Date()

        let (data, response) = try await session.data(from: url)

        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIError.networkUnavailable
        }

        guard httpResponse.statusCode == 200 else {
            throw APIError.requestFailed(httpResponse.statusCode)
        }

        let decoded: T
        do {
            decoded = try decoder.decode(T.self, from: data)
        } catch {
            // Try to print raw response for debugging
            if let raw = String(data: data, encoding: .utf8) {
                throw APIError.decodingFailed(raw.prefix(200).description)
            }
            throw APIError.decodingFailed(error.localizedDescription)
        }

        // Cache if needed
        if let key = cacheKey {
            cache.set(decoded, for: key)
        }

        return decoded
    }
}
