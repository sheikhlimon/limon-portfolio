import { Suspense } from "react"
import ContributionsClient, { RepoStat } from "./ContributionsClient"
import Loading from "./loading"
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
    .filter((r) => r.merged > 0)
    .toSorted((a, b) => b.merged - a.merged || b.total - a.total)

  const mergedCount = allPRs.filter((pr) => pr.isMerged).length
  const openCount = allPRs.filter((pr) => pr.state === "open" && !pr.isMerged).length

  return (
    <ContributionsClient
      prs={allPRs}
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
    <Suspense fallback={<Loading />}>
      <ContributionsContent />
    </Suspense>
  )
}
