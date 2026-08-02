import { SITE_CONFIG } from "../../lib/constants"
import { GitPullRequest, GitMerge, ArrowRight } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

interface GitHubPR {
  id: number
  html_url: string
  title: string
  number: number
  state: string
  created_at: string
  pull_request: {
    merged_at: string | null
  }
  repository_url: string
}

async function fetchLatestPRs(): Promise<GitHubPR[]> {
  const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" }
  const token = process.env.GITHUB_TOKEN
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(
    `https://api.github.com/search/issues?q=author:${SITE_CONFIG.githubUsername}+type:pr&sort=created&order=desc&per_page=30`,
    {
      headers,
      next: { revalidate: 3600 },
    }
  )

  if (!res.ok) return []
  const data = await res.json()
  return data.items
}

export default async function LatestPRs() {
  const prs = await fetchLatestPRs()
  const { excludedRepos } = SITE_CONFIG.contributions

  const isExcluded = (pr: GitHubPR) => {
    const parts = pr.repository_url.split("/")
    const repoFullName = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`
    return excludedRepos.includes(repoFullName)
  }

  // Filter out excluded repos and get only the latest 10
  const latestPRs = prs.filter((pr) => !isExcluded(pr)).slice(0, 10)

  if (latestPRs.length === 0) return null

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white font-display">
          Latest Open Source PRs
        </h2>
        <Link
          href="/contributions"
          className="group flex items-center gap-2 text-sm font-display text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          View all
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {latestPRs.map((pr) => {
          const parts = pr.repository_url.split("/")
          const repoOwner = parts[parts.length - 2]
          const repoName = parts[parts.length - 1]
          const isMerged = !!pr.pull_request?.merged_at
          const isOpen = pr.state === "open"
          const Icon = isMerged ? GitMerge : GitPullRequest

          const statusColors = isMerged
            ? "text-purple-500 dark:text-purple-400 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
            : isOpen
              ? "text-green-500 dark:text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
              : "text-red-500 dark:text-red-400"

          const borderHoverColors = isMerged
            ? "hover:border-purple-500/30 dark:hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]"
            : isOpen
              ? "hover:border-green-500/30 dark:hover:border-green-500/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)]"
              : "hover:border-red-500/30 dark:hover:border-red-500/30"

          return (
            <a
              key={pr.id}
              href={pr.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/30 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300 ${borderHoverColors}`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Icon
                  className={`w-5 h-5 shrink-0 transition-all duration-300 ${statusColors}`}
                  weight="regular"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-display text-gray-500 dark:text-gray-400 truncate">
                    {repoOwner}/{repoName}
                  </span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium truncate transition-colors">
                    {pr.title}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 shrink-0 mt-2 sm:mt-0">
                <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                  #{pr.number}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-sans">
                  {new Date(pr.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
