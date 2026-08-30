import { Suspense } from "react"
import Hero from "./components/Hero"
import LatestPRs from "./components/LatestPRs"
import { projects } from "../lib/projects"
import { getPosts } from "../lib/posts"
import Link from "next/link"

function ProjectsList() {
  return (
    <section className="space-y-4">
      <h2 className="section-heading text-gray-500 dark:text-gray-400">
        <span className="text-gray-300 dark:text-gray-700">## </span>open source & projects
      </h2>

      <div className="flex flex-col">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`py-4 ${index < projects.length - 1 ? "border-b border-dashed border-gray-200 dark:border-gray-800/80" : ""}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="text-base font-medium text-gray-900 dark:text-white font-display">
                {project.title}
              </h3>
              <div className="flex items-center gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-display text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    live
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-display text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  source
                </a>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="text-xs font-display text-gray-400 dark:text-gray-500">
                  {tech.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function WritingList() {
  const posts = getPosts()
  if (posts.length === 0) return null

  return (
    <section className="space-y-4">
      <h2 className="section-heading text-gray-500 dark:text-gray-400">
        <span className="text-gray-300 dark:text-gray-700">## </span>writing
      </h2>

      <div className="flex flex-col">
        {posts.map((post, index) => (
          <div
            key={post.slug}
            className={`py-3 ${index < posts.length - 1 ? "border-b border-dashed border-gray-200 dark:border-gray-800/80" : ""}`}
          >
            {post.externalUrl ? (
              <a
                href={post.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
              >
                <span className="text-sm text-gray-900 dark:text-gray-100 group-hover:underline decoration-gray-400 dark:decoration-gray-600">
                  {post.title}
                </span>
                <span className="text-xs font-display text-gray-400 dark:text-gray-500 whitespace-nowrap">
                  {post.date}
                </span>
              </a>
            ) : (
              <Link
                href={`/posts/${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
              >
                <span className="text-sm text-gray-900 dark:text-gray-100 group-hover:underline decoration-gray-400 dark:decoration-gray-600">
                  {post.title}
                </span>
                <span className="text-xs font-display text-gray-400 dark:text-gray-500 whitespace-nowrap">
                  {post.date}
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <Hero />

      <div className="section-divider" />
      <Suspense>
        <LatestPRs />
      </Suspense>

      <div className="section-divider" />
      <ProjectsList />

      <div className="section-divider" />
      <WritingList />
    </div>
  )
}
