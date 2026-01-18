import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'

const logsDirectory = path.join(process.cwd(), 'logs')

export async function generateStaticParams() {
  if (!fs.existsSync(logsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(logsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => ({
      slug: fileName.replace(/\.md$/, ''),
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const fullPath = path.join(logsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return {
      title: 'Log Not Found',
    }
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContents)

  return {
    title: `${data.title || 'Log'} - Sheikh Limon`,
    description: `Log entry by Sheikh Limon - ${data.date || ''}`,
  }
}

export default async function LogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const fullPath = path.join(logsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    notFound()
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-5 py-12">
        <div className="space-y-8">
          <div>
            <Link
              href="/logs"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              ← Back to Logs
            </Link>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{data.title || 'Untitled'}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">{data.date || ''}</p>
          </div>

          <article className="prose prose-gray dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  )
}
