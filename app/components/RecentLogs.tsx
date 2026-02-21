import Link from 'next/link'
import { getLogs } from '../../lib/logs'

export default function RecentLogs() {
  const logs = getLogs().slice(0, 3)

  if (logs.length === 0) {
    return null
  }

  return (
    <section id="recent-logs" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Recent Logs</h2>
        <Link
          href="/logs"
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {logs.map((log) => (
          <div key={log.slug} className="group">
            <Link
              href={`/logs/${log.slug}`}
              className="block py-2 border-b border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base text-gray-900 dark:text-white group-hover:underline">
                  {log.title}
                </h3>
                <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {log.date}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
