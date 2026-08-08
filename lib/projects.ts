export interface Project {
  title: string
  description: string
  techStack: string[]
  features: string[]
  github: string
  live?: string
  image?: string
  icon: "Globe" | "Shield" | "GraduationCap" | "Cube" | "Terminal" | "Briefcase"
}

export const projects: Project[] = [
  {
    title: "Packager Dashboard",
    description:
      "Displays real-time ecosystem metrics for Fedora packagers, including open bugs, proposed updates, pull requests, and build status.",
    techStack: ["React", "JavaScript", "Python", "Flask", "Linux"],
    features: [
      "Track open bugs, proposed updates, and build failures for Fedora packages",
      "Real-time packager metrics and active release monitoring",
    ],
    github: "https://forge.fedoraproject.org/apps/packager_dashboard",
    live: "https://packager-dashboard.fedoraproject.org",
    icon: "Terminal",
  },
  {
    title: "Anitya",
    description:
      "Upstream release monitoring project for Linux distributions and open-source ecosystems, automatically tracking package updates.",
    techStack: ["Python", "Flask", "SQLAlchemy", "Fedora Infra"],
    features: [
      "Monitors upstream project releases across the open-source ecosystem",
      "Sends real-time notification events when new versions are released",
    ],
    github: "https://github.com/fedora-infra/anitya",
    live: "https://release-monitoring.org",
    icon: "Globe",
  },
  {
    title: "goose",
    description:
      "Open-source AI agent that automates software engineering tasks and developer workflows.",
    techStack: ["Rust", "AI Agents", "CLI"],
    features: [
      "Extensible open-source AI agent framework",
      "Automates repetitive coding, testing, and debugging tasks",
    ],
    github: "https://github.com/aaif-goose/goose",
    live: "https://goose-docs.ai",
    icon: "Terminal",
  },
  {
    title: "InfraScope",
    description:
      "Infrastructure monitoring and management platform for Linux systems. Track system status, trigger scans, and maintain audit logs from one place.",
    techStack: ["Next.js", "Express.js", "PostgreSQL", "Prisma", "JWT", "Turborepo"],
    features: [
      "JWT auth with role-based access (Admin/User views)",
      "Real-time dashboard with stats and activity timeline",
      "System CRUD with status management (Active, Inactive, Scanning, Error)",
      "Complete activity logging and search/filter functionality",
    ],
    github: "https://github.com/sheikhlimon/infra-scope",
    live: "https://infra-scope.vercel.app",
    image: "/infra-scope.png",
    icon: "Cube",
  },
  {
    title: "Crypto Guardian",
    description:
      "Real-time crypto fraud detection system with risk scoring and multi-API validation",
    techStack: ["React", "Node.js", "Express"],
    features: [
      "Fast risk scoring (< 500ms) per wallet address",
      "Multi-API validation (Etherscan, BlockCypher, CoinGecko)",
      "Real-time fraud detection with 0-100 risk scores",
    ],
    github: "https://github.com/sheikhlimon/crypto-guardian",
    live: "https://crypto-guardian-frontend.vercel.app",
    image: "/crypto-guardian.png",
    icon: "Shield",
  },
]
