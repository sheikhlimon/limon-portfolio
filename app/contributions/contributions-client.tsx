'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { GitPullRequest, Star } from '@phosphor-icons/react'

interface Contribution {
  id: number
  title: string
  number: number
  url: string
  repo: string
  mergedAt: string | null
  description: string | null
}

export interface Repo {
  owner: string
  name: string
  fullName: string
  stars: number
  description: string
  mergedCount: number
  openCount: number
}

interface ContributionsClientProps {
  repos: Repo[]
  allMerged: Contribution[]
  allOpen: Contribution[]
}

type TabType = 'open' | 'closed'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function ContributionsClient({ repos, allMerged, allOpen }: ContributionsClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const repoParam = searchParams.get('repo')
  const tabParam = searchParams.get('tab') as TabType | null

  const selectedRepo = repoParam ? repos.find(r => r.fullName === repoParam) || null : null

  const repoPRs = selectedRepo
    ? {
        open: allOpen.filter(pr => pr.repo === selectedRepo.fullName),
        closed: allMerged.filter(pr => pr.repo === selectedRepo.fullName),
      }
    : null

  // Default to tab with more PRs if no tab param
  const defaultTab: TabType = (tabParam === 'open' || tabParam === 'closed')
    ? tabParam
    : repoPRs && repoPRs.closed.length >= repoPRs.open.length
      ? 'closed'
      : 'open'

  const activeTab: TabType = defaultTab

  const tabs: { id: TabType; label: string; count: number }[] = selectedRepo && repoPRs
    ? [
        { id: 'open', label: 'Open', count: repoPRs.open.length },
        { id: 'closed', label: 'Closed', count: repoPRs.closed.length },
      ]
    : []

  const contributions = selectedRepo && repoPRs
    ? activeTab === 'open'
      ? repoPRs.open
      : repoPRs.closed
    : []

  const setTab = (tab: TabType) => {
    if (selectedRepo) {
      router.replace(`/contributions?repo=${encodeURIComponent(selectedRepo.fullName)}&tab=${tab}`)
    }
  }

  return (
    <div className="pt-2 pb-12 w-full max-w-full">
      {selectedRepo ? (
        // Repo detail view
        <motion.div
          className="-mt-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white font-mono mb-6">
            {selectedRepo.fullName}
          </h1>

          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 mb-10 w-full overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`group relative font-mono text-xl sm:text-2xl transition-all duration-300 text-left max-w-full truncate cursor-pointer ${
                  activeTab === tab.id
                    ? 'font-bold text-gray-900 dark:text-white'
                    : 'font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  {tab.label}
                  <span className="text-sm opacity-60">{tab.count}</span>
                </span>
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gray-900 dark:bg-white transition-all duration-300 ${
                    activeTab === tab.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </div>

          {contributions.length > 0 ? (
            <div className="space-y-4 w-full">
              {contributions.map((contribution) => (
                <a
                  key={contribution.id}
                  href={contribution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg p-4 hover:border-gray-400/50 dark:hover:border-gray-500/50 hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300 hover:scale-[1.01]"
                >
                  <div className="flex items-start gap-3">
                    <GitPullRequest
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        activeTab === 'open'
                          ? 'text-green-500 dark:text-green-400'
                          : 'text-purple-500 dark:text-purple-400'
                      }`}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors truncate">
                          {contribution.title}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono flex-shrink-0">
                          #{contribution.number}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-mono text-gray-700 dark:text-gray-300">
                          {contribution.repo}
                        </span>
                        {contribution.mergedAt && (
                          <>
                            <span className="text-gray-400 dark:text-gray-500">•</span>
                            <span>{formatDate(contribution.mergedAt)}</span>
                          </>
                        )}
                      </div>

                      {contribution.description && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {contribution.description}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 py-12 text-center">
              No {activeTab} PRs.
            </div>
          )}
        </motion.div>
      ) : (
        // Repo list view
        <motion.div
          className="-mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white font-mono mb-8">
            Open Source Contributions
          </h1>

          {repos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {repos.map((repo) => (
                <motion.button
                  key={repo.fullName}
                  onClick={() => router.push(`/contributions?repo=${encodeURIComponent(repo.fullName)}`)}
                  className="w-full text-left group border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg p-5 hover:border-gray-400/50 dark:hover:border-gray-500/50 hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors truncate">
                            {repo.fullName}
                          </h3>
                        </div>
                        <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 font-mono">
                          <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                          {repo.stars.toLocaleString()}
                        </span>
                      </div>

                      {repo.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                          {repo.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
                        <span className="flex items-center gap-1">
                          <GitPullRequest className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                          {repo.mergedCount} merged
                        </span>
                        <span className="flex items-center gap-1">
                          <GitPullRequest className="w-4 h-4 text-green-500 dark:text-green-400" />
                          {repo.openCount} open
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 py-12 text-center">
              No contributions found since November 2025.
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}