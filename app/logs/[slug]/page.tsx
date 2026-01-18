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

          <article className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:before:content-[''] prose-code:after:content-['']">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({...props}) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
                h3: ({...props}) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
                p: ({...props}) => <p className="my-4 leading-7" {...props} />,
                code: ({className, children, ...props}) => {
                  const isInline = !className?.includes('language-')
                  return isInline ? (
                    <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-pink-600 dark:text-pink-400 font-mono text-sm" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className="block bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto" {...props}>
                      {children}
                    </code>
                  )
                },
                ul: ({...props}) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
                li: ({...props}) => <li className="leading-7" {...props} />,
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  )
}
