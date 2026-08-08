import { GitPullRequest, GitMerge, ArrowRight } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import { fetchAllPRs } from "../../lib/prs"

export default async function LatestPRs() {
  const prs = await fetchAllPRs()
  const latestPRs = prs.slice(0, 10)

  if (latestPRs.length === 0) return null

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="section-heading text-gray-500 dark:text-gray-400">
          <span className="text-gray-300 dark:text-gray-700">## </span>latest prs
        </h2>
        <Link
          href="/contributions"
          className="group flex items-center gap-1 text-xs font-display text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          view all
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="flex flex-col">
        {latestPRs.map((pr, index) => {
          const isMerged = pr.isMerged
          const isOpen = pr.state === "open"
          const Icon = isMerged ? GitMerge : GitPullRequest

          const statusColor = isMerged
            ? "text-purple-500 dark:text-purple-400"
            : isOpen
              ? "text-green-600 dark:text-green-400"
              : "text-red-500 dark:text-red-400"

          return (
            <a
              key={pr.id}
              href={pr.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-start gap-3 py-3 hover:bg-gray-50 dark:hover:bg-zinc-900/50 -mx-3 px-3 rounded transition-colors ${index < latestPRs.length - 1 ? "border-b border-dashed border-gray-200 dark:border-gray-800/80" : ""}`}
            >
              <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${statusColor}`} weight="regular" />
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 min-w-0 flex-1">
                <span className="text-gray-900 dark:text-gray-100 text-sm truncate group-hover:underline decoration-gray-400 dark:decoration-gray-600">
                  {pr.title}
                </span>
                <span className="text-xs font-display text-gray-400 dark:text-gray-500 whitespace-nowrap">
                  {pr.repo} #{pr.number}
                </span>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-600 whitespace-nowrap shrink-0 font-display">
                {new Date(pr.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
