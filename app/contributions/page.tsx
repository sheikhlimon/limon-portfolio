import { Suspense } from "react"
import ContributionsClient, { ContributionPR, RepoStat } from "./ContributionsClient"
import { fetchAllPRs, fetchAllReviews, fetchAllIssues } from "../../lib/contributions"

export const revalidate = 3600

async function ContributionsContent() {
  const [allPRs, reviews, issues] = await Promise.all([
    fetchAllPRs(),
    fetchAllReviews(),
    fetchAllIssues(),
  ])

  const repoCounts = new Map<string, { merged: number; open: number }>()

  allPRs.forEach((pr) => {
    const entry = repoCounts.get(pr.repo) || { merged: 0, open: 0 }
    if (pr.isMerged) {
      entry.merged++
    } else if (pr.state === "open") {
      entry.open++
    }
    repoCounts.set(pr.repo, entry)
  })

  const repos: RepoStat[] = Array.from(repoCounts.entries())
    .map(([repo, counts]) => ({
      repo,
      merged: counts.merged,
      open: counts.open,
      total: counts.merged + counts.open,
    }))
    .toSorted((a, b) => b.merged - a.merged || b.total - a.total)

  const mergedCount = allPRs.filter((pr) => pr.isMerged).length
  const openCount = allPRs.filter((pr) => pr.state === "open" && !pr.isMerged).length

  const prs: ContributionPR[] = allPRs.map((pr) => ({
    id: pr.id,
    title: pr.title,
    number: pr.number,
    url: pr.html_url,
    repo: pr.repo,
    createdAt: pr.created_at,
    mergedAt: pr.merged_at,
    isMerged: pr.isMerged,
    state: pr.state,
  }))

  return (
    <ContributionsClient
      prs={prs}
      repos={repos}
      reviews={reviews}
      issues={issues}
      stats={{
        totalMerged: mergedCount,
        totalOpen: openCount,
        totalRepos: repos.length,
      }}
    />
  )
}

export default function ContributionsPage() {
  return (
    <Suspense fallback={null}>
      <ContributionsContent />
    </Suspense>
  )
}
