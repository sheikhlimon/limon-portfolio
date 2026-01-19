export interface Project {
  title: string
  description: string
  techStack: string[]
  features: string[]
  github: string
  live?: string
  icon: 'Globe' | 'Shield' | 'GraduationCap'
}

export const projects: Project[] = [
  {
    title: 'gesture-share',
    description: 'Cross-device gesture-controlled file sharing using React, MediaPipe, and WebRTC',
    techStack: ['React', 'MediaPipe', 'WebRTC'],
    features: [
      '95%+ gesture accuracy with MediaPipe',
      '80% faster setup using QR-based pairing',
      'P2P file transfers without keyboard requirements',
    ],
    github: 'https://github.com/sheikhlimon/gesture-share',
    icon: 'Globe',
  },
  {
    title: 'crypto-guardian',
    description: 'Real-time crypto fraud detection system with risk scoring and multi-API validation',
    techStack: ['React', 'Node.js', 'Express'],
    features: [
      'Fast risk scoring (< 500ms) per wallet address',
      'Multi-API validation (Etherscan, BlockCypher, CoinGecko)',
      'Real-time fraud detection with 0-100 risk scores',
    ],
    github: 'https://github.com/sheikhlimon/crypto-guardian',
    icon: 'Shield',
  },
  {
    title: 'college-booking-app',
    description: 'Discover, compare, and apply to colleges with ease. Search for colleges, view details, add reviews, and submit admission applications online.',
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
]
