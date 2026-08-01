// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CueMaster",
    platforms: [
        .iOS(.v17),
        .macOS(.v14),
        .watchOS(.v10)
    ],
    products: [
        .library(name: "CueMaster", targets: ["CueMaster"]),
    ],
    targets: [
        .target(
            name: "CueMaster",
            path: "Sources/CueMaster",
            resources: []
        ),
        .target(
            name: "WidgetExtension",
            path: "Sources/WidgetExtension"
        ),
    ]
)
