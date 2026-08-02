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
  {
    title: "College Booking App",
    description:
      "Discover, compare, and apply to colleges with ease. Search for colleges, view details, add reviews, and submit admission applications online.",
    techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Firebase"],
    features: [
      "College search with filtering and detailed admission information",
      "Online admission system with review and rating functionality",
      "Email/password and Google OAuth authentication",
    ],
    github: "https://github.com/sheikhlimon/college-booking-app",
    live: "https://college-booking-app-nine.vercel.app",
    image: "/college-booking.png",
    icon: "GraduationCap",
  },
]
