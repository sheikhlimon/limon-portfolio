import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const logsDirectory = path.join(process.cwd(), 'logs')

export type LogType = 'log' | 'blog'

export interface Log {
  title: string
  date: string
  year: string
  slug: string
  content: string
  type: LogType
}

export function getLogs(): Log[] {
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
        type: (data.type as LogType) || 'log',
      }
    })

  // Sort by date (newest first)
  return allLogs.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}
