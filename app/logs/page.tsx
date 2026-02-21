import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Logs - Sheikh Limon',
  description: 'Logs by Sheikh Limon - Full-Stack Developer',
}

const logsDirectory = path.join(process.cwd(), 'logs')

// Get all markdown files and parse them
function getLogs() {
  if (!fs.existsSync(logsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(logsDirectory)
  const allLogs = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(logsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        title: data.title || '',
        date: data.date || '',
        year: data.year || '',
        slug: fileName.replace(/\.md$/, ''),
        content: fileContents,
      }
    })

  // Sort by date (newest first)
  return allLogs.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

// Group logs by year
function groupLogsByYear(logs: ReturnType<typeof getLogs>) {
  return logs.reduce((acc, log) => {
    if (!acc[log.year]) {
      acc[log.year] = []
    }
    acc[log.year].push(log)
    return acc
  }, {} as Record<string, ReturnType<typeof getLogs>>)
}

export default function LogsPage() {
  const logs = getLogs()
  const groupedLogs = groupLogsByYear(logs)

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-5 py-12">
        <div className="space-y-8">
          <h1 className="text-xl font-bold text-center">Logs</h1>

          <div className="space-y-10">
            {Object.entries(groupedLogs)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([year, yearLogs]) => (
                <div key={year}>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    {year}
                  </h2>
                  <div className="space-y-3">
                    {yearLogs.map((log, index) => (
                      <div key={log.slug}>
                        <div className="flex items-baseline justify-between gap-6">
                          <Link
                            href={`/logs/${log.slug}`}
                            className="text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:underline"
                          >
                            {log.title}
                          </Link>
                          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {log.date}
                          </span>
                        </div>
                        {index < yearLogs.length - 1 && (
                          <div className="border-b border-gray-200 dark:border-gray-800 mt-3" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
