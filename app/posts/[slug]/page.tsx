import { Metadata } from "next"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import CodeBlock from "../../components/CodeBlock"

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
      className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4 break-words"
      {...props}
    />
  ),
  h2: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-base font-semibold text-gray-900 dark:text-white mt-8 mb-4 break-words"
      {...props}
    />
  ),
  h3: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-sm font-semibold text-gray-900 dark:text-white mt-6 mb-3 break-words"
      {...props}
    />
  ),
  p: ({ ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="my-4 leading-relaxed text-lg text-gray-700 dark:text-gray-300 break-words"
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
          className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-200 font-mono text-sm break-all inline-block max-w-full"
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
    <div className="max-w-2xl mx-auto px-5 w-full overflow-x-hidden">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white break-words">
            {data.title || "Untitled"}
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">{data.date || ""}</p>
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
