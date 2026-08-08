import { Suspense } from "react"
import ContributionsClient from "./contributions-client"
import { Repo } from "./contributions-client"
import { fetchAllPRs } from "../../lib/prs"

export const revalidate = 3600

async function getRepoInfo(repoFullName: string, provider: "github" | "forge") {
  try {
    if (provider === "github") {
      const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" }
      const token = process.env.GITHUB_TOKEN
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
      const res = await fetch(`https://api.github.com/repos/${repoFullName}`, { headers })
      if (!res.ok) return null
      const data = await res.json()
      return {
        stars: data.stargazers_count || 0,
        description: data.description || "",
      }
    } else {
      const res = await fetch(`https://forge.fedoraproject.org/api/v1/repos/${repoFullName}`)
      if (!res.ok) return null
      const data = await res.json()
      return {
        stars: data.stars_count || 0,
        description: data.description || "",
      }
    }
  } catch {
    return null
  }
}

async function ContributionsContent() {
  const allPRs = await fetchAllPRs()

  const merged = allPRs.filter((pr) => pr.isMerged)
  const open = allPRs.filter((pr) => pr.state === "open" && !pr.isMerged)

  // Group by repo
  const repoStats = new Map<
    string,
    { merged: Set<string>; open: Set<string>; provider: "github" | "forge" }
  >()

  allPRs.forEach((pr) => {
    if (!repoStats.has(pr.repo)) {
      repoStats.set(pr.repo, { merged: new Set(), open: new Set(), provider: pr.provider })
    }
    const stats = repoStats.get(pr.repo)!
    if (pr.isMerged) {
      stats.merged.add(pr.id)
    } else if (pr.state === "open") {
      stats.open.add(pr.id)
    }
  })

  // Fetch repo info
  const repos: Repo[] = []
  const repoPromises = Array.from(repoStats.entries()).map(async ([fullName, stats]) => {
    const [owner, name] = fullName.split("/")
    const info = await getRepoInfo(fullName, stats.provider)
    repos.push({
      owner,
      name,
      fullName,
      stars: info ? info.stars : 0,
      description: info ? info.description : "",
      mergedCount: stats.merged.size,
      openCount: stats.open.size,
    })
  })

  await Promise.all(repoPromises)

  // Sort repos by recent activity
  const repoLatestActivity = new Map<string, Date>()
  allPRs.forEach((pr) => {
    const date = new Date(pr.created_at)
    const existing = repoLatestActivity.get(pr.repo)
    if (!existing || date > existing) {
      repoLatestActivity.set(pr.repo, date)
    }
  })

  repos.sort((a, b) => {
    const aActivity = repoLatestActivity.get(a.fullName)
    const bActivity = repoLatestActivity.get(b.fullName)
    if (!aActivity && !bActivity) return b.stars - a.stars
    if (!aActivity) return 1
    if (!bActivity) return -1
    return bActivity.getTime() - aActivity.getTime()
  })

  return (
    <ContributionsClient
      repos={repos}
      allMerged={merged.map((pr) => ({
        id: pr.id,
        title: pr.title,
        number: pr.number,
        url: pr.html_url,
        repo: pr.repo,
        mergedAt: pr.merged_at || pr.created_at,
        description: pr.body?.slice(0, 200) || null,
      }))}
      allOpen={open.map((pr) => ({
        id: pr.id,
        title: pr.title,
        number: pr.number,
        url: pr.html_url,
        repo: pr.repo,
        mergedAt: null,
        description: pr.body?.slice(0, 200) || null,
      }))}
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
