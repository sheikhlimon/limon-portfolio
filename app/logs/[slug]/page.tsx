import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CodeBlock from '../../components/CodeBlock'
import Link from 'next/link'

const logsDirectory = path.join(process.cwd(), 'logs')

function calculateReadingTime(content: string): string {
  // Remove code blocks and markdown syntax
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with just text
    .replace(/[#*_~\[\]()]/g, '') // Remove markdown symbols
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()

  const wordsPerMinute = 130 // Technical content takes longer
  const words = plainText.split(/\s+/).filter(w => w.length > 0).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min`
}

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
            <h1 className="text-2xl font-bold">{data.title || 'Untitled'}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data.date || ''} · {calculateReadingTime(content)}
            </p>
          </div>

          <article className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:max-w-full">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({...props}) => <h2 className="text-base font-semibold mt-8 mb-4" {...props} />,
                h3: ({...props}) => <h3 className="text-sm font-semibold mt-6 mb-3" {...props} />,
                p: ({...props}) => <p className="my-4 leading-7" {...props} />,
                pre: ({children}) => {
                  return <>{children}</>
                },
                code: ({className, children, ...props}: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                  const match = /language-(\w+)/.exec(className || '')
                  const language = match ? match[1] : ''
                  const isInline = !String(children).includes('\n')

                  if (isInline && !language) {
                    return (
                      <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-rose-600 dark:text-rose-400 font-mono text-sm" {...props}>
                        {children}
                      </code>
                    )
                  }

                  return (
                    <CodeBlock code={String(children).replace(/\n$/, '')} language={language || 'text'} />
                  )
                },
                ul: ({...props}) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
                li: ({children}) => <li className="leading-7">{children}</li>,
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
