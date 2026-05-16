import Link from "next/link"
import { getLogs } from "../../lib/logs"

export default function RecentPosts() {
  const posts = getLogs().slice(0, 5)

  if (posts.length === 0) {
    return null
  }

  return (
    <section id="recent-posts" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold font-display">Recent Posts</h2>
        <Link
          href="/posts"
          className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:translate-x-1 transition-all duration-300"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.slug} className="group">
            {post.externalUrl ? (
              <a
                href={post.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 border-b border-gray-200 dark:border-gray-800 hover:border-gray-400/50 dark:hover:border-gray-500/50 transition-colors duration-300"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg text-gray-700 dark:text-gray-300 group-hover:underline transition-all duration-300 group-hover:translate-x-1 font-normal font-display">
                    {post.title}
                  </h3>
                  <span className="text-base text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {post.date}
                  </span>
                </div>
              </a>
            ) : (
              <Link
                href={`/posts/${post.slug}`}
                className="block py-2 border-b border-gray-200 dark:border-gray-800 hover:border-gray-400/50 dark:hover:border-gray-500/50 transition-colors duration-300"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg text-gray-700 dark:text-gray-300 group-hover:underline transition-all duration-300 group-hover:translate-x-1 font-normal font-display">
                    {post.title}
                  </h3>
                  <span className="text-base text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {post.date}
                  </span>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
