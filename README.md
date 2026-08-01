# 🎱 CueMaster — 台球赛事追踪 App

> 以斯诺克为主，兼容中式八球 & 九球 | 中文优先 | 基于 F1 Push·围场 架构理念

## 项目状态

🚧 **MVP 开发中** — SwiftUI iOS App

## 技术栈

- **语言**: Swift 5.9+
- **UI 框架**: SwiftUI (iOS 17+)
- **架构**: MVVM + Clean Architecture
- **数据**: api.snooker.org (免费) + RapidAPI Snooker API (实时)
- **本地存储**: SwiftData / UserDefaults
- **小组件**: WidgetKit + ActivityKit

## 项目结构

```
CueMaster/
├── Package.swift
├── Sources/
│   ├── CueMaster/           # 主 App Target
│   │   ├── App/             # App 入口 + MainTabView
│   │   ├── Domain/          # 领域层
│   │   │   ├── Models/      # Tournament, Match, Player, Ranking, News, SportType
│   │   │   ├── UseCases/
│   │   │   └── RepositoryProtocols/
│   │   ├── Data/            # 数据层
│   │   │   ├── API/         # SnookerAPIClient, Endpoints, Config
│   │   │   ├── Repositories/# Repository 实现
│   │   │   └── Cache/       # 本地缓存
│   │   ├── Features/        # 功能模块
│   │   │   ├── Schedule/    # 赛程 (View + VM + Detail)
│   │   │   ├── Rankings/    # 排名 (View + VM + PlayerDetail)
│   │   │   ├── Players/     # 球员 (View + VM)
│   │   │   ├── News/        # 新闻发现 (View + VM)
│   │   │   ├── Profile/     # 个人中心
│   │   │   └── SportPicker/ # 赛事类型选择器
│   │   ├── Core/            # 核心工具
│   │   │   ├── Theme/       # 主题管理 (绿丝绒)
│   │   │   ├── Extensions/
│   │   │   └── Utilities/   # 格式化工具
│   │   └── Resources/       # Mock 数据
│   └── WidgetExtension/     # Widget 扩展
└── README.md
```

## 功能状态

| 功能 | 状态 |
|------|------|
| 斯诺克赛程日历 | ✅ 已实现 |
| 赛事详情 + 对阵 | ✅ 已实现 |
| 世界排名 | ✅ 已实现 |
| 球员详情 + 赛季统计 | ✅ 已实现 |
| 赛事类型选择器（斯诺克/中式八球/九球） | ✅ 已实现 |
| 新闻发现 | ✅ 已实现 |
| 关注球员 | ✅ 已实现 |
| 深色主题（绿丝绒） | ✅ 已实现 |
| 小组件（小/中/大） | ✅ 已实现 |
| Pro 订阅页面 | ✅ 已实现 |
| 实时比分 | 🚧 待接入 API |
| 推送通知 | 🚧 待接入 |
| 中式八球数据 | 🚧 待手动维护 |
| 九球数据 | 🚧 待接入 |
| Android 版本 | 📋 计划中 |

## 数据源

- **api.snooker.org** — 免费斯诺克赛事/排名/球员数据 (无需 API Key)
- **Snooker API (RapidAPI)** — 实时逐帧比分 (Freemium)
- **飞鲸体育** — 国内体育数据 (中式八球备选)

## 设计系统

**绿丝绒 (Green Velvet)**

```
主背景:   #0D1B16   深绿黑
主强调色: #1B7A4A   斯诺克绿
辅助色:   #C8A951   黄铜金
中式八球: #C41E3A   中国红
九球:     #1E3A8A   深蓝
```

## 在 Mac 上运行

1. Clone 本项目
2. 在 Xcode 16+ 中打开 Package.swift
3. 选择 iOS 17+ Simulator
4. Cmd+R 运行

## 许可

MIT License — 仅供学习参考，非商业用途。
F1、斯诺克、中式八球相关商标归各权利方所有。
