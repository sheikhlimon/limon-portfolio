import { Metadata } from "next"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import CodeBlock from "../../components/CodeBlock"
import Link from "next/link"
import { House } from "@phosphor-icons/react/dist/ssr"
const postsDirectory = path.join(process.cwd(), "logs")

export async function generateStaticParams() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => ({
      slug: fileName.replace(/\.md$/, ""),
    }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return {
      title: "Post Not Found",
    }
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data } = matter(fileContents)

  return {
    title: `${data.title || "Post"} - Sheikh Limon`,
    description: `Post by Sheikh Limon - ${data.date || ""}`,
  }
}

const markdownComponents = {
  h1: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4 break-words font-sans"
      {...props}
    />
  ),
  h2: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3 break-words font-sans"
      {...props}
    />
  ),
  h3: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2 break-words font-sans"
      {...props}
    />
  ),
  p: ({ ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="my-4 leading-relaxed text-base text-gray-700 dark:text-gray-300 break-words font-sans"
      {...props}
    />
  ),
  pre: ({ children }: React.HTMLAttributes<HTMLPreElement>) => <>{children}</>,
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const match = /language-(\w+)/.exec(className || "")
    const language = match ? match[1] : ""
    const isInline = !String(children).includes("\n")

    if (isInline && !language) {
      return (
        <code
          className="bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-200 font-mono text-xs break-all inline-block max-w-full"
          {...props}
        >
          {children}
        </code>
      )
    }

    return <CodeBlock code={String(children).replace(/\n$/, "")} language={language || "text"} />
  },
  table: ({ ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-4 min-w-0 w-full max-w-full">
      <table className="min-w-full" {...props} />
    </div>
  ),
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    notFound()
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 w-full overflow-x-hidden pt-8 sm:pt-10">
      <div className="flex flex-col gap-8 sm:gap-10">
        <div className="space-y-4 pb-6 border-b border-dashed border-gray-200 dark:border-gray-800/80">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <House className="w-4 h-4" weight="bold" />
            <span>home</span>
          </Link>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white break-words">
              {data.title || "Untitled"}
            </h1>
            <p className="text-sm text-gray-400 dark:text-gray-500">{data.date || ""}</p>
          </div>
        </div>

        <article className="prose prose-gray dark:prose-invert max-w-none w-full overflow-x-hidden">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  )
}
