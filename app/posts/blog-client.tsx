'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Post } from './page'

type TabType = 'blog' | 'log'

function groupPostsByYear(posts: Post[]) {
  return posts.reduce((acc, post) => {
    if (!acc[post.year]) {
      acc[post.year] = []
    }
    acc[post.year].push(post)
    return acc
  }, {} as Record<string, Post[]>)
}

const tabs = [
  { id: 'blog' as TabType, label: 'Blog' },
  { id: 'log' as TabType, label: 'Logs' },
]

interface BlogClientProps {
  posts: Post[]
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('blog')

  const filteredPosts = posts.filter(post => post.type === activeTab)

  const groupedPosts = groupPostsByYear(filteredPosts)

  return (
    <motion.div
      className="pt-2 pb-12 w-full max-w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 mb-10 w-full overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group relative font-mono text-lg sm:text-2xl transition-all duration-300 text-left max-w-full truncate cursor-pointer ${
              activeTab === tab.id
                ? 'font-bold text-gray-900 dark:text-white'
                : 'font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
            <span className={`absolute -bottom-1 left-0 h-px bg-gray-900 dark:bg-white transition-all duration-300 ${
              activeTab === tab.id ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </button>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="w-full max-w-full">
          {Object.entries(groupedPosts)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([year, yearPosts]) => (
              <div key={year} className="w-full space-y-10">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  {year}
                </h2>
                <div className="space-y-3">
                  {yearPosts.map((post, index) => (
                    <div key={post.slug} className="group">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 min-w-0">
                        <Link
                          href={`/posts/${post.slug}`}
                          className="text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:underline break-words max-w-full transition-all duration-300 group-hover:translate-x-1"
                        >
                          {post.title}
                        </Link>
                        <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap sm:whitespace-nowrap">
                          {post.date} · {post.readingTime}
                        </span>
                      </div>
                      {index < yearPosts.length - 1 && (
                        <div className="border-b border-gray-200 dark:border-gray-800 mt-3" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-gray-500 dark:text-gray-400 py-12 text-center">
          No {activeTab}s yet.
        </div>
      )}
      </motion.div>
  )
}
