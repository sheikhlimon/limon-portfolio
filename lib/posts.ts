import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface Post {
  title: string
  date: string
  year: string
  slug: string
  readingTime: string
  type: "log" | "blog"
  externalUrl?: string
  tags: string[]
}

function calculateReadingTime(content: string): string {
  const plainText = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_~[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim()

  const wordsPerMinute = 130
  const words = plainText.split(/\s+/).filter((w) => w.length > 0).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min`
}

function parseString(val: unknown): string {
  if (!val) return ""
  if (typeof val === "string") return val
  if (val instanceof Date) return val.toISOString().split("T")[0]
  return String(val)
}

export function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), "logs")
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        title: parseString(data.title),
        date: parseString(data.date),
        year: parseString(data.year),
        slug: fileName.replace(/\.md$/, ""),
        readingTime: data.readingTime || (data.externalUrl ? "" : calculateReadingTime(content)),
        type: (data.type as "log" | "blog") || "log",
        externalUrl: data.externalUrl || undefined,
        tags: Array.isArray(data.tags) ? data.tags : [],
      }
    })

  return allPosts.toSorted((a, b) => {
    const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime()
    return dateDiff !== 0 ? dateDiff : b.slug.localeCompare(a.slug)
  })
}
