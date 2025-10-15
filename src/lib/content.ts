export const navigation = [
  { label: "Docs", href: "https://water-rs.github.io/waterui/" },
  { label: "API", href: "https://docs.rs/waterui" },
  { label: "Roadmap", href: "https://github.com/water-rs/waterui/blob/main/ROADMAP.md" },
  { label: "Updates", href: "https://x.com/waterui_dev" }
] as const;

export const heroFacts = [
  {
    label: "Language",
    value: "Rust-first, type-safe UI"
  },
  {
    label: "Rendering",
    value: "SwiftUI, GTK4, Web, embedded"
  },
  {
    label: "License",
    value: "MIT — open and community driven"
  }
] as const;

export const cliWorkflows = [
  {
    value: "create",
    label: "Create",
    title: "Start a project in seconds",
    description:
      "Generate applications with SwiftUI, GTK4, Android, and experimental canvas backends aligned from the first commit.",
    command:
      "water create demo --backend swiftui --backend gtk4 --bundle dev.water.demo --yes --dev",
    accent: "blue"
  },
  {
    value: "run",
    label: "Run",
    title: "Iterate on every surface",
    description:
      "Launch synchronized live builds across mobile and desktop shells with a single flag and keep bindings hot.",
    command: "water run demo --platform desktop",
    accent: "red"
  },
  {
    value: "package",
    label: "Package",
    title: "Ship ready binaries",
    description:
      "Produce signed bundles, installers, and telemetry packages without opening heavy IDE tooling.",
    command: "water package demo --platform android --skip-native",
    accent: "yellow"
  }
] as const;

export const principles = [
  {
    title: "Cross-Platform",
    description:
      "Ship once across Apple platforms, GTK4 desktops, Android, and the self-rendering engine under active development.",
    accent: "blue"
  },
  {
    title: "High Performance",
    description:
      "Fine-grained reactive bindings keep interfaces responsive without a virtual DOM or unnecessary redraws.",
    accent: "red"
  },
  {
    title: "Design Native",
    description:
      "Layouts follow Bauhaus-like geometry with first-class typography, media widgets, and composable primitives.",
    accent: "yellow"
  }
] as const;

export const socials = [
  {
    label: "GitHub",
    href: "https://github.com/water-rs/waterui"
  },
  {
    label: "X",
    href: "https://x.com/waterui_dev"
  }
] as const;

export const cliPlaybooks = [
  {
    value: "scaffold",
    label: "Scaffold",
    accent: "blue",
    headline: "Blueprint once, ship everywhere",
    summary: "Spin up a synchronized project frame for SwiftUI, GTK4, Android, and canvas targets.",
    details: [
      "Maps navigation, routing, and asset bundles into each shell from one manifest.",
      "Pipelines design tokens so surfaces inherit the same rhythm across targets."
    ],
    commands: [
      "water create studio --backend swiftui --backend gtk4 --module ui.shell",
      "water run studio --platform desktop --watch"
    ],
    insights: [
      "Generates coordinated backends with shared Rust view logic",
      "Starts a watch server so UI changes ripple instantly"
    ]
  },
  {
    value: "iterate",
    label: "Iterate",
    accent: "red",
    headline: "Keep the flow hot while you design",
    summary: "Preview layout experiments, motion, and typography without leaving the terminal.",
    details: [
      "Streams navigation and state changes directly into native shells in seconds.",
      "Pairs CLI toggles with the hero console so design review stays tactile."
    ],
    commands: [
      "water run studio --platform ios --experimental-hot-reload",
      "water run studio --platform android --sync"
    ],
    insights: [
      "Streams layout diffs to native shells in under a second",
      "Mirrors CLI toggles with the in-app control console"
    ]
  },
  {
    value: "ship",
    label: "Ship",
    accent: "yellow",
    headline: "Package production artifacts with confidence",
    summary: "Bundle binaries, assets, and metadata from one manifest-driven pipeline.",
    details: [
      "Publishes reproducible manifests that plug into CI and release dashboards.",
      "Signs mobile, desktop, and experimental builds with shared provenance."
    ],
    commands: [
      "water package studio --platform android --skip-native",
      "water package studio --platform desktop --release"
    ],
    insights: [
      "Creates signed outputs with reproducible versioning",
      "Publishes build manifests that plug into CI workflows"
    ]
  }
] as const;

export const cliHighlights = [
  {
    value: "launch",
    label: "Launch",
    title: "Launch once, everywhere",
    summary: "Scaffold SwiftUI, GTK4, Android, and canvas shells from a single manifest.",
    details: [
      "Unifies module names, assets, and theme tokens across targets instantly.",
      "Keeps platform build graphs in lockstep so review cycles stay short."
    ],
    accent: "blue"
  },
  {
    value: "sync",
    label: "Sync",
    title: "Stay in the flow",
    summary: "Hot reload and watch services mirror design tweaks on every device.",
    details: [
      "Streams layout diffs into connected shells within milliseconds.",
      "Logs a shared console trace so teams diagnose motion and data issues together."
    ],
    accent: "red"
  },
  {
    value: "ship",
    label: "Ship",
    title: "Release with signal",
    summary: "Publish binaries, assets, and telemetry with a reproducible CLI ritual.",
    details: [
      "Integrates with CI to surface readiness across channels.",
      "Exports release notes, checksums, and provenance for stakeholders."
    ],
    accent: "yellow"
  }
] as const;

export const cliSurfaceChannels = [
  {
    value: "swiftui",
    label: "SwiftUI",
    accent: "blue",
    signal: "Green",
    description: "Live previews respond instantly with native typography and navigation."
  },
  {
    value: "gtk4",
    label: "GTK4",
    accent: "red",
    signal: "Amber",
    description: "Desktop shell awaiting motion verification before the next drop."
  },
  {
    value: "android",
    label: "Android",
    accent: "yellow",
    signal: "Blue",
    description: "Gradle packaging queued behind texture optimization sweeps."
  },
  {
    value: "canvas",
    label: "Canvas",
    accent: "black",
    signal: "Violet",
    description: "Self-rendering preview labs exploring fluid typography rendering."
  }
] as const;

export const cliSignalBands = [
  {
    id: "draft",
    min: 0,
    max: 39,
    title: "Draft mode",
    message: "Focus on wiring data contracts and instrumentation before broadcasting builds.",
    accent: "red"
  },
  {
    id: "review",
    min: 40,
    max: 69,
    title: "In review",
    message: "Design, platform, and QA signals are syncing — expect rapid iteration cycles.",
    accent: "yellow"
  },
  {
    id: "go",
    min: 70,
    max: 100,
    title: "Go for launch",
    message: "All surfaces are synchronized with healthy telemetry. Prep release notes and flip the switch.",
    accent: "blue"
  }
] as const;

export const featureHighlights = [
  {
    title: "True native rendering",
    description:
      "WaterUI composes directly into SwiftUI, GTK4, and upcoming self-rendering engines, so widgets feel at home everywhere."
  },
  {
    title: "Fine-grained reactivity",
    description:
      "Bindings cascade updates only where data changes — similar to Vue Signals — which keeps animations crisp and battery light."
  },
  {
    title: "Composable architecture",
    description:
      "Modules stay modular: combine layout stacks, forms, media, and navigation primitives without sacrificing Rust's type safety."
  }
] as const;

export const ecosystemResources = [
  {
    label: "Tutorial Book",
    description: "A guided path from first component to production layout.",
    href: "https://water-rs.github.io/waterui/"
  },
  {
    label: "API Reference",
    description: "docs.rs hosts the latest stable API surface across crates.",
    href: "https://docs.rs/waterui"
  },
  {
    label: "Roadmap",
    description: "Follow milestones and backlog shaping the next releases.",
    href: "https://github.com/water-rs/waterui/blob/main/ROADMAP.md"
  }
] as const;

export const architectureLayers = [
  {
    title: "Core framework",
    detail:
      "View traits, reactive environment, and foundational primitives that power every backend."
  },
  {
    title: "Component libraries",
    detail:
      "Typography, layout, form, and media crates that scale from wearables to desktop surfaces."
  },
  {
    title: "Platform backends",
    detail:
      "SwiftUI today, GTK4 on desktop, with Android and self-rendering engines in active development."
  }
] as const;

export const roadmapMilestones = [
  {
    version: "0.1 First Glance",
    focus: "Foundation",
    highlights: [
      "SwiftUI backend",
      "GTK4 desktop preview",
      "Core layout and binding design"
    ],
    status: "Shipped",
    summary: "The inaugural release delivering core widgets, layouts, and the initial cross-platform story.",
    accent: "blue"
  },
  {
    version: "0.2 Usable",
    focus: "Stability",
    highlights: [
      "Android backend MVP",
      "Layout system stabilization",
      "water CLI shipping"
    ],
    status: "Now",
    summary:
      "Focus on tightening memory, hot reload, and packaging so teams can explore production pilots.",
    accent: "red"
  },
  {
    version: "0.3 Practical",
    focus: "Depth",
    highlights: [
      "Media widget polish",
      "Resource management",
      "Accessibility expansion"
    ],
    status: "In Progress",
    summary:
      "Expand rendering depth with rich media, advanced resource handling, and inclusive design primitives.",
    accent: "yellow"
  },
  {
    version: "0.4 Self-Rendering",
    focus: "Autonomy",
    highlights: [
      "Self-rendering backend",
      "Canvas API groundwork",
      "Preview + tooling"
    ],
    status: "On Deck",
    summary:
      "Bring the standalone renderer online with canvas APIs and integrated preview tooling for every platform.",
    accent: "black"
  }
] as const;
