export interface Project {
  title: string
  description: string
  techStack: string[]
  features: string[]
  github: string
  live?: string
  icon: 'Globe' | 'Shield' | 'GraduationCap' | 'Cube' | 'Terminal'
}

export const projects: Project[] = [
  {
    title: 'InfraScope',
    description:
      'Infrastructure monitoring and management platform for Linux systems. Track system status, trigger scans, and maintain audit logs from one place.',
    techStack: ['Next.js', 'Express.js', 'PostgreSQL', 'Prisma', 'JWT', 'Turborepo'],
    features: [
      'JWT auth with role-based access (Admin/User views)',
      'Real-time dashboard with stats and activity timeline',
      'System CRUD with status management (Active, Inactive, Scanning, Error)',
      'Complete activity logging and search/filter functionality',
    ],
    github: 'https://github.com/sheikhlimon/infra-scope',
    live: 'https://infra-scope.vercel.app',
    icon: 'Cube',
  },
  {
    title: 'Crypto Guardian',
    description:
      'Real-time crypto fraud detection system with risk scoring and multi-API validation',
    techStack: ['React', 'Node.js', 'Express'],
    features: [
      'Fast risk scoring (< 500ms) per wallet address',
      'Multi-API validation (Etherscan, BlockCypher, CoinGecko)',
      'Real-time fraud detection with 0-100 risk scores',
    ],
    github: 'https://github.com/sheikhlimon/crypto-guardian',
    live: 'https://crypto-guardian-frontend.vercel.app',
    icon: 'Shield',
  },
  {
    title: 'College Booking App',
    description:
      'Discover, compare, and apply to colleges with ease. Search for colleges, view details, add reviews, and submit admission applications online.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Firebase'],
    features: [
      'College search with filtering and detailed admission information',
      'Online admission system with review and rating functionality',
      'Email/password and Google OAuth authentication',
    ],
    github: 'https://github.com/sheikhlimon/college-booking-app',
    live: 'https://college-booking-app-nine.vercel.app',
    icon: 'GraduationCap',
  },
  {
    title: 'QuickHire',
    description:
      'Modern job board application for browsing jobs, submitting applications, and managing listings with admin panel',
    techStack: ['Next.js', 'Express', 'MongoDB', 'Prisma', 'TypeScript', 'Turborepo'],
    features: [
      'Job search and filtering by category/location',
      'Application system with resume and cover letter upload',
      'Admin panel for creating and managing job listings',
      'JWT authentication with user signup and login',
    ],
    github: 'https://github.com/sheikhlimon/quick-hire',
    live: 'https://quick-hire-web-delta.vercel.app',
    icon: 'Globe',
  },
  {
    title: 'Gesture Share',
    description: 'Cross-device gesture-controlled file sharing using React, MediaPipe, and WebRTC',
    techStack: ['React', 'MediaPipe', 'WebRTC'],
    features: [
      '95%+ gesture accuracy with MediaPipe',
      '80% faster setup with QR-based pairing',
      'P2P file transfers without keyboard requirements',
    ],
    github: 'https://github.com/sheikhlimon/gesture-share',
    live: 'https://gesture-share.vercel.app',
    icon: 'Globe',
  },
  {
    title: 'AI Agent Profile Builder',
    description:
      'Visual drag-and-drop interface for building AI agent profiles. Pick components from a library, arrange them on a canvas, and preview your agent in real time.',
    techStack: ['React', 'TypeScript', 'Zustand', '@dnd-kit', 'Tailwind CSS', 'Vite', 'Bun'],
    features: [
      'Drag-and-drop assembly with live agent preview',
      'Saved agents persisted locally via Zustand',
      'Responsive — desktop drag-and-drop, mobile tap-to-select',
      'Terminal-inspired UI with dark theme',
    ],
    github: 'https://github.com/sheikhlimon/agent-builder',
    live: 'https://agent-builder-omega.vercel.app',
    icon: 'Terminal',
  },
]
