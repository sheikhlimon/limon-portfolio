import { Suspense } from "react"
import Hero from "./components/Hero"
import LatestPRs from "./components/LatestPRs"
import { projects } from "../lib/projects"
import { getPosts } from "../lib/posts"
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr"
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
            className={`py-3.5 ${index < projects.length - 1 ? "border-b border-dashed border-gray-200 dark:border-gray-800/80" : ""}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="text-base sm:text-[17px] font-bold text-gray-900 dark:text-white">
                  <a
                    href={project.live || project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-700 dark:hover:text-purple-400/80 transition-colors"
                  >
                    {project.title}
                  </a>
                </h3>
                {project.role && (
                  <span className="font-mono inline-flex items-center rounded-full border border-dashed border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {project.role}
                  </span>
                )}
              </div>
              <div className="relative group/tooltip inline-flex items-center">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={project.github.includes("forge.fedoraproject.org") ? "forge" : "github"}
                  className="inline-flex items-center gap-1 text-sm sm:text-[15px] font-bold text-gray-500 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400/80 transition-colors"
                >
                  source
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <span className="pointer-events-none absolute -top-7 right-0 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-150 font-mono text-[11px] px-1.5 py-0.5 rounded border border-dashed border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {project.github.includes("forge.fedoraproject.org") ? "forge" : "github"}
                </span>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs sm:text-[13px] text-gray-400 dark:text-gray-500 font-mono"
                >
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
            className={`py-3.5 ${index < posts.length - 1 ? "border-b border-dashed border-gray-200 dark:border-gray-800/80" : ""}`}
          >
            <Link
              href={post.externalUrl || `/posts/${post.slug}`}
              target={post.externalUrl ? "_blank" : undefined}
              rel={post.externalUrl ? "noopener noreferrer" : undefined}
              className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
            >
              <span className="text-base sm:text-[17px] font-medium text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400/80 truncate transition-colors">
                {post.title}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap shrink-0">
                {post.date}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div
      suppressHydrationWarning
      className="max-w-4xl mx-auto px-5 sm:px-8 w-full space-y-12 sm:space-y-14"
    >
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
