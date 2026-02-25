import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import BlogClient from './blog-client'

export const metadata: Metadata = {
  title: 'Blog - Sheikh Limon',
  description: 'Blog posts and logs by Sheikh Limon - Full-Stack Developer',
}

const postsDirectory = path.join(process.cwd(), 'logs')

export interface Post {
  title: string
  date: string
  year: string
  slug: string
  readingTime: string
  type: 'log' | 'blog'
}

function calculateReadingTime(content: string): string {
  const plainText = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_~\[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  const wordsPerMinute = 130
  const words = plainText.split(/\s+/).filter(w => w.length > 0).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min`
}

function getPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        title: data.title || '',
        date: data.date || '',
        year: data.year || '',
        slug: fileName.replace(/\.md$/, ''),
        readingTime: calculateReadingTime(content),
        type: (data.type as 'log' | 'blog') || 'log',
      }
    })

  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function BlogPage() {
  const posts = getPosts()
  return <BlogClient posts={posts} />
}
