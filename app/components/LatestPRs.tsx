import { GitPullRequest, GitMerge, ArrowRight } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import { fetchAllPRs } from "../../lib/contributions"

function RepoBadge({ repo, className = "" }: { repo: string; className?: string }) {
  const isForge = repo.startsWith("apps/") || repo.startsWith("infra/")
  const href = isForge ? `https://forge.fedoraproject.org/${repo}` : `https://github.com/${repo}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`font-mono inline-flex min-w-0 max-w-full items-center rounded-full border border-dashed border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 px-2.5 py-0.5 text-xs text-gray-500 dark:text-gray-400 transition-colors hover:border-gray-400 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-white ${className}`}
    >
      <span className="truncate">{repo}</span>
    </a>
  )
}

function ExternalIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

export default async function LatestPRs() {
  const allPRs = await fetchAllPRs()
  const latestPRs = allPRs.slice(0, 10)

  if (latestPRs.length === 0) return null

  return (
    <section className="space-y-4 snap-start">
      <div className="flex items-center justify-between">
        <h2 className="section-heading text-gray-500 dark:text-gray-400">
          <span className="text-gray-300 dark:text-gray-700">## </span>latest prs
        </h2>
        <Link
          href="/contributions"
          className="group flex items-center gap-1 text-sm font-display text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
        >
          view all
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
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
            <div
              key={pr.id}
              className={`group flex items-center gap-3.5 py-3.5 transition-colors ${
                index < latestPRs.length - 1
                  ? "border-b border-dashed border-gray-200 dark:border-gray-800/80"
                  : ""
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${statusColor}`} weight="regular" />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <a
                  href={pr.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-purple-500 dark:group-hover:text-purple-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                >
                  {pr.title}
                </a>
                <div className="flex min-w-0 items-center gap-2">
                  <RepoBadge repo={pr.repo} />
                  <span className="font-display shrink-0 text-xs text-gray-400 dark:text-gray-500">
                    #{pr.number}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs tabular-nums text-gray-400 dark:text-gray-500 shrink-0 hidden sm:inline">
                {new Date(pr.created_at).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </span>
              <a
                href={pr.html_url}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:text-purple-500 dark:hover:text-purple-400"
                aria-label="View PR"
              >
                <ExternalIcon />
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}
