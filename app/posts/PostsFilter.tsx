"use client"

import { useState } from "react"
import Link from "next/link"
import type { Post } from "../../lib/posts"

export default function PostsFilter({ posts }: { posts: Post[] }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).toSorted()

  const filteredPosts = selectedTag ? posts.filter((p) => p.tags.includes(selectedTag)) : posts

  return (
    <div className="space-y-6">
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`text-xs sm:text-[13px] font-mono px-2 py-0.5 rounded border border-dashed transition-colors ${
              selectedTag === null
                ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                : "border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            all
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-xs sm:text-[13px] font-mono px-2 py-0.5 rounded border border-dashed transition-colors ${
                selectedTag === tag
                  ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                  : "border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col">
        {filteredPosts.map((post, index) => (
          <div
            key={post.slug}
            className={`py-3.5 ${
              index < filteredPosts.length - 1
                ? "border-b border-dashed border-gray-200 dark:border-gray-800/80"
                : ""
            }`}
          >
            <Link
              href={post.externalUrl || `/posts/${post.slug}`}
              target={post.externalUrl ? "_blank" : undefined}
              rel={post.externalUrl ? "noopener noreferrer" : undefined}
              className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
            >
              <span className="text-base sm:text-[17px] font-medium text-gray-900 dark:text-white group-hover:text-mauve line-clamp-2 sm:truncate transition-colors">
                {post.title}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap shrink-0">
                {post.date}
              </span>
            </Link>
          </div>
        ))}
        {filteredPosts.length === 0 && (
          <div className="py-4 text-sm text-gray-500 dark:text-gray-400">No posts found.</div>
        )}
      </div>
    </div>
  )
}
