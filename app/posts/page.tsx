import type { Metadata } from "next"
import { getPosts } from "../../lib/posts"
import PostsFilter from "./PostsFilter"

export const metadata: Metadata = {
  title: "Posts",
  description: "Writing and logs.",
}

export default function PostsPage() {
  const posts = getPosts()

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 w-full pt-8 sm:pt-10">
      <section className="space-y-4">
        <h2 className="section-heading text-gray-500 dark:text-gray-400">
          <span className="text-gray-300 dark:text-gray-700">## </span>posts
        </h2>

        <PostsFilter posts={posts} />
      </section>
    </div>
  )
}
