import { Globe, Shield } from 'lucide-react'

export default function Projects() {
  return (
    <section id="projects" className="space-y-6">
      <h2 className="text-2xl font-semibold">Featured Projects</h2>

      <div className="max-w-2xl mx-auto space-y-6">
        <a
          href="https://github.com/sheikhlimon/gesture-share"
          target="_blank"
          rel="noopener noreferrer"
          className="block border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg p-4 hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/5 group hover:scale-[1.02] hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
              <Globe className="w-4 h-4" />
              gesture-share
            </h3>
          </div>

          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p className="text-sm">
              Cross-device gesture-controlled file sharing using React, MediaPipe, and WebRTC
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1 px-2 py-1 text-xs border border-zinc-400/70 dark:border-zinc-500/50 rounded">
                React
              </span>
              <span className="flex items-center gap-1 px-2 py-1 text-xs border border-zinc-400/70 dark:border-zinc-500/50 rounded">
                MediaPipe
              </span>
              <span className="flex items-center gap-1 px-2 py-1 text-xs border border-zinc-400/70 dark:border-zinc-500/50 rounded">
                WebRTC
              </span>
            </div>

            <ul className="text-sm space-y-1">
              <li>• 95%+ gesture accuracy with MediaPipe</li>
              <li>• 80% faster setup using QR-based pairing</li>
              <li>• P2P file transfers without keyboard requirements</li>
            </ul>
          </div>
        </a>

        <a
          href="https://github.com/sheikhlimon/crypto-guardian"
          target="_blank"
          rel="noopener noreferrer"
          className="block border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg p-4 hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/5 group hover:scale-[1.02] hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
              <Shield className="w-4 h-4" />
              crypto-guardian
            </h3>
          </div>

          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p className="text-sm">
              Real-time crypto fraud detection system with risk scoring and multi-API validation
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1 px-2 py-1 text-xs border border-zinc-400/70 dark:border-zinc-500/50 rounded">
                React
              </span>
              <span className="flex items-center gap-1 px-2 py-1 text-xs border border-zinc-400/70 dark:border-zinc-500/50 rounded">
                Node.js
              </span>
              <span className="flex items-center gap-1 px-2 py-1 text-xs border border-zinc-400/70 dark:border-zinc-500/50 rounded">
                Express
              </span>
            </div>

            <ul className="text-sm space-y-1">
              <li>• Fast risk scoring (&lt; 500ms) per wallet address</li>
              <li>• Multi-API validation (Etherscan, BlockCypher, CoinGecko)</li>
              <li>• Real-time fraud detection with 0-100 risk scores</li>
            </ul>
          </div>
        </a>
      </div>
    </section>
  )
}
