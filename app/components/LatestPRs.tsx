import { GitPullRequest, GitMerge, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import { fetchAllPRs } from "../../lib/contributions"

function RepoBadge({ repo, className = "" }: { repo: string; className?: string }) {
  const isForge = repo.startsWith("apps/") || repo.startsWith("infra/")
  const href = isForge ? `https://forge.fedoraproject.org/${repo}` : `https://github.com/${repo}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-mono inline-flex min-w-0 max-w-full items-center rounded-full border border-dashed border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 px-2.5 py-0.5 text-xs text-gray-500 dark:text-gray-400 transition-colors hover:border-gray-400 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-white ${className}`}
    >
      <span className="truncate">{repo}</span>
    </a>
  )
}

export default async function LatestPRs() {
  const allPRs = await fetchAllPRs()
  const latestPRs = allPRs.slice(0, 10)

  if (latestPRs.length === 0) return null

  return (
    <section suppressHydrationWarning className="space-y-4 snap-start">
      <div suppressHydrationWarning className="flex items-center justify-between">
        <h2 className="section-heading text-gray-500 dark:text-gray-400">
          <span className="text-gray-300 dark:text-gray-700">## </span>latest prs
        </h2>
        <Link
          href="/contributions"
          className="group flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          view all
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div suppressHydrationWarning className="flex flex-col">
        {latestPRs.map((pr, index) => {
          const isMerged = pr.isMerged
          const isOpen = pr.state === "open"
          const Icon = isMerged ? GitMerge : GitPullRequest
          const statusColor = isMerged
            ? "text-purple-600 dark:text-purple-400"
            : isOpen
              ? "text-green-600 dark:text-green-400"
              : "text-red-500 dark:text-red-400"

          return (
            <div
              key={pr.id}
              suppressHydrationWarning
              className={`group flex items-center gap-3.5 py-3.5 transition-colors ${
                index < latestPRs.length - 1
                  ? "border-b border-dashed border-gray-200 dark:border-gray-800/80"
                  : ""
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${statusColor}`} weight="regular" />
              <div suppressHydrationWarning className="flex min-w-0 flex-1 flex-col gap-0.5">
                <a
                  href={pr.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-base sm:text-[17px] font-medium text-gray-900 dark:text-white hover:text-purple-700 dark:hover:text-purple-400/80 transition-colors"
                >
                  {pr.title}
                </a>
                <div suppressHydrationWarning className="flex min-w-0 items-center gap-2">
                  <RepoBadge repo={pr.repo} />
                  <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                    #{pr.number}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs sm:text-sm tabular-nums text-gray-400 dark:text-gray-500 shrink-0 hidden sm:inline">
                {new Date(pr.created_at).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </span>
              <a
                href={pr.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:text-purple-700 dark:hover:text-purple-400/80"
                aria-label="View PR"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}
