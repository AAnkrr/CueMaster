import Foundation

// MARK: - Mock Data (for SwiftUI Previews & Development)

enum MockData {

    // MARK: - Players

    static let juddTrump = Player(
        id: "1", firstName: "Judd", lastName: "Trump", nameZh: "贾德·特鲁姆普",
        nationality: "ENG", nationalityZh: "英格兰", turnedPro: 2005,
        highestRanking: 1, imageURL: nil, flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        currentRanking: 1, rankingPoints: 1655550
    )

    static let neilRobertson = Player(
        id: "2", firstName: "Neil", lastName: "Robertson", nameZh: "尼尔·罗伯逊",
        nationality: "AUS", nationalityZh: "澳大利亚", turnedPro: 1998,
        highestRanking: 1, imageURL: nil, flagEmoji: "🇦🇺",
        currentRanking: 2, rankingPoints: 1210550
    )

    static let zhaoXintong = Player(
        id: "3", firstName: "Xintong", lastName: "Zhao", nameZh: "赵心童",
        nationality: "CHN", nationalityZh: "中国", turnedPro: 2016,
        highestRanking: 3, imageURL: nil, flagEmoji: "🇨🇳",
        currentRanking: 3, rankingPoints: 1176550
    )

    static let wuYize = Player(
        id: "4", firstName: "Yize", lastName: "Wu", nameZh: "吴宜泽",
        nationality: "CHN", nationalityZh: "中国", turnedPro: 2019,
        highestRanking: 4, imageURL: nil, flagEmoji: "🇨🇳",
        currentRanking: 4, rankingPoints: 1120900
    )

    static let johnHiggins = Player(
        id: "5", firstName: "John", lastName: "Higgins", nameZh: "约翰·希金斯",
        nationality: "SCO", nationalityZh: "苏格兰", turnedPro: 1992,
        highestRanking: 1, imageURL: nil, flagEmoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
        currentRanking: 5, rankingPoints: 958350
    )

    static let ronnieOSullivan = Player(
        id: "6", firstName: "Ronnie", lastName: "O'Sullivan", nameZh: "罗尼·奥沙利文",
        nationality: "ENG", nationalityZh: "英格兰", turnedPro: 1992,
        highestRanking: 1, imageURL: nil, flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        currentRanking: 14, rankingPoints: 551250
    )

    static let dingJunhui = Player(
        id: "7", firstName: "Junhui", lastName: "Ding", nameZh: "丁俊晖",
        nationality: "CHN", nationalityZh: "中国", turnedPro: 2003,
        highestRanking: 1, imageURL: nil, flagEmoji: "🇨🇳",
        currentRanking: 15, rankingPoints: 464850
    )

    static let siJiahui = Player(
        id: "8", firstName: "Jiahui", lastName: "Si", nameZh: "斯佳辉",
        nationality: "CHN", nationalityZh: "中国", turnedPro: 2019,
        highestRanking: 16, imageURL: nil, flagEmoji: "🇨🇳",
        currentRanking: 16, rankingPoints: 439400
    )

    static let kyrenWilson = Player(
        id: "9", firstName: "Kyren", lastName: "Wilson", nameZh: "凯伦·威尔逊",
        nationality: "ENG", nationalityZh: "英格兰", turnedPro: 2010,
        highestRanking: 2, imageURL: nil, flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        currentRanking: 8, rankingPoints: 897100
    )

    static let markSelby = Player(
        id: "10", firstName: "Mark", lastName: "Selby", nameZh: "马克·塞尔比",
        nationality: "ENG", nationalityZh: "英格兰", turnedPro: 1999,
        highestRanking: 1, imageURL: nil, flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        currentRanking: 9, rankingPoints: 849350
    )

    static let shaunMurphy = Player(
        id: "11", firstName: "Shaun", lastName: "Murphy", nameZh: "肖恩·墨菲",
        nationality: "ENG", nationalityZh: "英格兰", turnedPro: 1997,
        highestRanking: 3, imageURL: nil, flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        currentRanking: 6, rankingPoints: 956800
    )

    static let markWilliams = Player(
        id: "12", firstName: "Mark", lastName: "Williams", nameZh: "马克·威廉姆斯",
        nationality: "WAL", nationalityZh: "威尔士", turnedPro: 1992,
        highestRanking: 1, imageURL: nil, flagEmoji: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
        currentRanking: 7, rankingPoints: 903400
    )

    static let allPlayers: [Player] = [
        juddTrump, neilRobertson, zhaoXintong, wuYize, johnHiggins,
        shaunMurphy, markWilliams, kyrenWilson, markSelby,
        ronnieOSullivan, dingJunhui, siJiahui
    ]

    static let top16Players: [Player] = allPlayers  // Simplified — real app would have 16 distinct

    static var playerRefs: [PlayerRef] {
        allPlayers.map {
            PlayerRef(id: $0.id, firstName: $0.firstName, lastName: $0.lastName,
                      nationality: $0.nationality, flagEmoji: $0.flagEmoji)
        }
    }

    // MARK: - Rankings

    static let worldRankings: RankingList = {
        let entries = [
            ("1", "Judd", "Trump", "ENG", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", 1655550, nil),
            ("2", "Neil", "Robertson", "AUS", "🇦🇺", 1210550, 3),
            ("3", "Xintong", "Zhao", "CHN", "🇨🇳", 1176550, nil),
            ("4", "Yize", "Wu", "CHN", "🇨🇳", 1120900, 5),
            ("5", "John", "Higgins", "SCO", "🏴󠁧󠁢󠁳󠁣󠁴󠁿", 958350, nil),
            ("6", "Shaun", "Murphy", "ENG", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", 956800, nil),
            ("7", "Mark", "Williams", "WAL", "🏴󠁧󠁢󠁷󠁬󠁳󠁿", 903400, nil),
            ("8", "Kyren", "Wilson", "ENG", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", 897100, -6),
            ("9", "Mark", "Selby", "ENG", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", 849350, nil),
            ("10", "Barry", "Hawkins", "ENG", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", 685350, nil),
            ("11", "Guodong", "Xiao", "CHN", "🇨🇳", 658900, nil),
            ("12", "Mark", "Allen", "NIR", "🇬🇧", 587750, nil),
            ("13", "Chris", "Wakelin", "ENG", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", 584200, nil),
            ("14", "Ronnie", "O'Sullivan", "ENG", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", 551250, -9),
            ("15", "Junhui", "Ding", "CHN", "🇨🇳", 464850, nil),
            ("16", "Jiahui", "Si", "CHN", "🇨🇳", 439400, nil),
        ]
        return RankingList(
            type: .official,
            season: "2025/26",
            lastUpdated: Date(),
            entries: entries.enumerated().map { idx, data in
                RankingEntry(
                    id: data.0,
                    player: PlayerRef(id: data.0, firstName: data.1, lastName: data.2,
                                      nationality: data.3, flagEmoji: data.4),
                    rank: idx + 1,
                    previousRank: data.6.map { idx + 1 + $0 },
                    points: data.5,
                    season: "2025/26",
                    rankingType: .official
                )
            }
        )
    }()

    // MARK: - Tournaments

    static let worldChampionship = Tournament(
        id: "wsc-2026",
        name: "World Snooker Championship",
        nameZh: "斯诺克世界锦标赛",
        category: .tripleCrown,
        sportType: .snooker,
        season: "2025/26",
        startDate: Calendar.current.date(from: DateComponents(year: 2026, month: 4, day: 18))!,
        endDate: Calendar.current.date(from: DateComponents(year: 2026, month: 5, day: 4))!,
        venue: "Crucible Theatre",
        city: "Sheffield",
        country: "England",
        prizeFund: 2395000,
        prizeFundFormatted: "£2,395,000",
        rounds: [],
        status: .completed,
        defendingChampion: "Kyren Wilson"
    )

    static let shanghaiMasters = Tournament(
        id: "shanghai-2026",
        name: "Shanghai Masters",
        nameZh: "上海大师赛",
        category: .invitational,
        sportType: .snooker,
        season: "2026/27",
        startDate: Calendar.current.date(from: DateComponents(year: 2026, month: 7, day: 28))!,
        endDate: Calendar.current.date(from: DateComponents(year: 2026, month: 8, day: 3))!,
        venue: "上海体育馆",
        city: "上海",
        country: "中国",
        prizeFund: 825000,
        prizeFundFormatted: "£825,000",
        rounds: [],
        status: .upcoming,
        defendingChampion: "Judd Trump"
    )

    static let saudiMasters = Tournament(
        id: "saudi-2026",
        name: "Saudi Arabia Snooker Masters",
        nameZh: "沙特阿拉伯大师赛",
        category: .ranking,
        sportType: .snooker,
        season: "2026/27",
        startDate: Calendar.current.date(from: DateComponents(year: 2026, month: 8, day: 8))!,
        endDate: Calendar.current.date(from: DateComponents(year: 2026, month: 8, day: 16))!,
        venue: "King Abdullah Sports City",
        city: "吉达",
        country: "沙特阿拉伯",
        prizeFund: 2300000,
        prizeFundFormatted: "£2,300,000",
        rounds: [],
        status: .upcoming,
        defendingChampion: "Judd Trump"
    )

    static let wuhanOpen = Tournament(
        id: "wuhan-2026",
        name: "Wuhan Open",
        nameZh: "武汉公开赛",
        category: .ranking,
        sportType: .snooker,
        season: "2026/27",
        startDate: Calendar.current.date(from: DateComponents(year: 2026, month: 8, day: 24))!,
        endDate: Calendar.current.date(from: DateComponents(year: 2026, month: 8, day: 30))!,
        venue: "武汉体育馆",
        city: "武汉",
        country: "中国",
        prizeFund: 700000,
        prizeFundFormatted: "£700,000",
        rounds: [],
        status: .upcoming,
        defendingChampion: "Xiao Guodong"
    )

    static let ukChampionship = Tournament(
        id: "uk-2025",
        name: "UK Championship",
        nameZh: "英锦赛",
        category: .tripleCrown,
        sportType: .snooker,
        season: "2025/26",
        startDate: Calendar.current.date(from: DateComponents(year: 2025, month: 11, day: 29))!,
        endDate: Calendar.current.date(from: DateComponents(year: 2025, month: 12, day: 7))!,
        venue: "Barbican Centre",
        city: "York",
        country: "England",
        prizeFund: 1173000,
        prizeFundFormatted: "£1,173,000",
        rounds: [],
        status: .completed,
        defendingChampion: "Judd Trump"
    )

    static let theMasters = Tournament(
        id: "masters-2026",
        name: "The Masters",
        nameZh: "大师赛",
        category: .tripleCrown,
        sportType: .snooker,
        season: "2025/26",
        startDate: Calendar.current.date(from: DateComponents(year: 2026, month: 1, day: 11))!,
        endDate: Calendar.current.date(from: DateComponents(year: 2026, month: 1, day: 18))!,
        venue: "Alexandra Palace",
        city: "London",
        country: "England",
        prizeFund: 750000,
        prizeFundFormatted: "£750,000",
        rounds: [],
        status: .completed,
        defendingChampion: "Shaun Murphy"
    )

    static let germanMasters = Tournament(
        id: "german-2026",
        name: "German Masters",
        nameZh: "德国大师赛",
        category: .ranking,
        sportType: .snooker,
        season: "2025/26",
        startDate: Calendar.current.date(from: DateComponents(year: 2026, month: 1, day: 26))!,
        endDate: Calendar.current.date(from: DateComponents(year: 2026, month: 2, day: 1))!,
        venue: "Tempodrom",
        city: "Berlin",
        country: "Germany",
        prizeFund: 427000,
        prizeFundFormatted: "£427,000",
        rounds: [],
        status: .completed,
        defendingChampion: "Judd Trump"
    )

    static let scheduledTournaments: [Tournament] = [
        worldChampionship, ukChampionship, theMasters, germanMasters,
        shanghaiMasters, saudiMasters, wuhanOpen
    ]

    // MARK: - Matches

    static let sampleMatch1 = Match(
        id: "m1",
        tournamentId: "wsc-2026",
        roundName: "Final",
        roundNameZh: "决赛",
        player1: PlayerRef(id: "1", firstName: "Judd", lastName: "Trump", nationality: "ENG", flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿"),
        player2: PlayerRef(id: "3", firstName: "Xintong", lastName: "Zhao", nationality: "CHN", flagEmoji: "🇨🇳"),
        score1: 18, score2: 15,
        frames: [],
        status: .completed,
        startTime: Calendar.current.date(from: DateComponents(year: 2026, month: 5, day: 3)),
        tableNumber: 1,
        referee: "Paul Collier"
    )

    static let sampleMatch2 = Match(
        id: "m2",
        tournamentId: "shanghai-2026",
        roundName: "Semi-Final",
        roundNameZh: "半决赛",
        player1: PlayerRef(id: "3", firstName: "Xintong", lastName: "Zhao", nationality: "CHN", flagEmoji: "🇨🇳"),
        player2: PlayerRef(id: "7", firstName: "Junhui", lastName: "Ding", nationality: "CHN", flagEmoji: "🇨🇳"),
        score1: 6, score2: 2,
        frames: [],
        status: .completed,
        startTime: Calendar.current.date(from: DateComponents(year: 2026, month: 8, day: 2)),
        tableNumber: 1,
        referee: nil
    )

    // MARK: - Player Stats

    static let zhaoSeasonStats = PlayerSeasonStats(
        playerId: "3",
        season: "2025/26",
        matchesPlayed: 67,
        matchesWon: 48,
        centuries: 72,
        highestBreak: 147,
        prizeMoneyEarned: 1176550
    )

    static let trumpSeasonStats = PlayerSeasonStats(
        playerId: "1",
        season: "2025/26",
        matchesPlayed: 58,
        matchesWon: 45,
        centuries: 65,
        highestBreak: 145,
        prizeMoneyEarned: 1655550
    )

    // MARK: - News

    static let newsItems: [NewsItem] = [
        NewsItem(
            id: "n1",
            title: "Zhao Xintong Makes History - First Chinese Player to Reach World Championship Final",
            titleZh: "赵心童创造历史——成为首位打进世锦赛决赛的中国球员",
            summary: "赵心童在半决赛中以17-12击败尼尔·罗伯逊，成为历史上第一位进入斯诺克世界锦标赛决赛的中国球员。",
            source: .wst,
            url: URL(string: "https://www.wst.tv")!,
            imageURL: nil,
            publishedAt: Calendar.current.date(from: DateComponents(year: 2026, month: 5, day: 2))!,
            language: .zh,
            category: .tournament
        ),
        NewsItem(
            id: "n2",
            title: "Judd Trump wins fourth World Championship title",
            titleZh: "特鲁姆普赢得第四个世锦赛冠军",
            summary: "特鲁姆普在决赛中以18-15战胜赵心童，获得个人第四个世界冠军头衔。",
            source: .bbc,
            url: URL(string: "https://www.bbc.com/sport/snooker")!,
            imageURL: nil,
            publishedAt: Calendar.current.date(from: DateComponents(year: 2026, month: 5, day: 4))!,
            language: .zh,
            category: .tournament
        ),
        NewsItem(
            id: "n3",
            title: "2026/27 Season Calendar Announced — Shanghai Masters Returns",
            titleZh: "2026/27赛季赛程公布——上海大师赛回归",
            summary: "WST公布2026/27赛季完整赛程，上海大师赛将于7月28日拉开新赛季大幕。中国赛事增加至6站。",
            source: .snookerHQ,
            url: URL(string: "https://snookerhq.com")!,
            imageURL: nil,
            publishedAt: Calendar.current.date(from: DateComponents(year: 2026, month: 6, day: 9))!,
            language: .zh,
            category: .tournament
        ),
        NewsItem(
            id: "n4",
            title: "World Rankings Update: Trump Stays No.1, Zhao Breaks Top 3",
            titleZh: "世界排名更新：特鲁姆普稳居第一，赵心童冲入前三",
            summary: "世锦赛后的最新世界排名中，特鲁姆普以超过165万英镑继续位居榜首，赵心童首次进入世界前三。",
            source: .wst,
            url: URL(string: "https://www.wst.tv")!,
            imageURL: nil,
            publishedAt: Calendar.current.date(from: DateComponents(year: 2026, month: 5, day: 7))!,
            language: .zh,
            category: .ranking
        ),
        NewsItem(
            id: "n5",
            title: "O'Sullivan Plans Comeback After Injury-Plagued Season",
            titleZh: "奥沙利文计划在伤病困扰的赛季后复出",
            summary: "罗尼·奥沙利文表示将在新赛季恢复参赛。这位七届世界冠军在上赛季因医疗原因缺席了多项赛事，排名跌至第14位。",
            source: .bbc,
            url: URL(string: "https://www.bbc.com/sport/snooker")!,
            imageURL: nil,
            publishedAt: Calendar.current.date(from: DateComponents(year: 2026, month: 7, day: 15))!,
            language: .zh,
            category: .player
        ),
    ]
}
