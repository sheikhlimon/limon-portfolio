import { Metadata } from 'next'
import { Suspense } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import BlogClient from './blog-client'

export const metadata: Metadata = {
  title: 'Blog - Sheikh Limon',
  description: 'Blog posts and logs by Sheikh Limon - Backend Developer',
}

const postsDirectory = path.join(process.cwd(), 'logs')

export interface Post {
  title: string
  date: string
  year: string
  slug: string
  readingTime: string
  type: 'log' | 'blog'
  externalUrl?: string
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
        readingTime: data.readingTime || (data.externalUrl ? '' : calculateReadingTime(content)),
        type: (data.type as 'log' | 'blog') || 'log',
        externalUrl: data.externalUrl || undefined,
      }
    })

  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function PostsSkeleton() {
  return (
    <div className="pt-2 pb-12 w-full max-w-full">
      {/* Tab skeleton */}
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 mb-10">
        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      </div>
      {/* Posts skeleton */}
      <div className="space-y-10">
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-8" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
              <div className="h-6 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              <div className="h-5 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function BlogPage() {
  const posts = getPosts()
  return (
    <Suspense fallback={<PostsSkeleton />}>
      <BlogClient posts={posts} />
    </Suspense>
  )
}
