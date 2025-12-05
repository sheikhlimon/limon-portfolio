import { OPENSOURCE_STATS } from '../../lib/constants'
import { Terminal, Settings, CheckCircle, GitBranch } from 'lucide-react'

export default function OSS() {
  return (
    <section id="oss" className="space-y-6">
      <h2 className="text-2xl font-semibold">Open-Source Contributions</h2>

      <div className="max-w-2xl mx-auto space-y-6">
        <a
          href={OPENSOURCE_STATS.repository.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-2 py-1 border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex hover:bg-gray-50 dark:hover:bg-gray-800/50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span>{OPENSOURCE_STATS.repository.name}</span>
          <span className="text-sm text-gray-500">(22k+ stars)</span>
        </a>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              CLI Features & Core Functionality
            </h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>
                  Implemented{' '}
                  <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                    --output-format json
                  </code>{' '}
                  flag{' '}
                  <span className="text-sm text-gray-500">
                    (130+ LOC, multiple review iterations)
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Added graceful fallback for keyring failures</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Bug Fixes & Performance
            </h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Fixed repeated 404 errors from deleted session access</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Added standard context menu items to prevent empty right-click menus</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Resolved MCP-hermit cleanup path expansion issues</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              Development Tools & Code Quality
            </h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>
                  Added unified style checks with{' '}
                  <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                    check-everything
                  </code>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Updated Husky prepare script to v9 format</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
