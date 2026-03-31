import { Suspense } from 'react'
import ContributionsClient from './contributions-client'
import { Repo } from './contributions-client'

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
  user: {
    login: string
  }
  repository_url: string
  body: string | null
}

interface GitHubSearchResponse {
  total_count: number
  items: GitHubPR[]
}

export const dynamic = 'force-dynamic'

async function fetchPRs(query: string): Promise<GitHubPR[]> {
  const res = await fetch(
    `https://api.github.com/search/issues?q=author:sheikhlimon+type:pr+${query}&sort=updated&order=desc&per_page=100`,
    {
      cache: 'no-store',
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }
  )

  if (!res.ok) {
    console.error('Failed to fetch PRs:', res.status)
    return []
  }

  const data: GitHubSearchResponse = await res.json()
  return data.items
}

async function getRepoInfo(owner: string, repo: string) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    cache: 'no-store',
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  })

  if (!res.ok) {
    return null
  }

  return res.json()
}

async function ContributionsContent() {
  const [merged, open] = await Promise.all([fetchPRs('is:merged'), fetchPRs('is:open')])

  // Filter PRs after November 2025
  const novemberDate = new Date('2025-11-01').getTime()

  const filteredMerged = merged.filter(
    (pr) =>
      pr.pull_request.merged_at && new Date(pr.pull_request.merged_at).getTime() >= novemberDate
  )

  const filteredOpen = open.filter((pr) => new Date(pr.created_at).getTime() >= novemberDate)

  // Group by repo and count
  const repoStats = new Map<string, { merged: Set<number>; open: Set<number> }>()

  filteredMerged.forEach((pr) => {
    const parts = pr.repository_url.split('/')
    const owner = parts[parts.length - 2]
    const name = parts[parts.length - 1]
    const key = `${owner}/${name}`
    if (!repoStats.has(key)) {
      repoStats.set(key, { merged: new Set(), open: new Set() })
    }
    repoStats.get(key)!.merged.add(pr.id)
  })

  filteredOpen.forEach((pr) => {
    const parts = pr.repository_url.split('/')
    const owner = parts[parts.length - 2]
    const name = parts[parts.length - 1]
    const key = `${owner}/${name}`
    if (!repoStats.has(key)) {
      repoStats.set(key, { merged: new Set(), open: new Set() })
    }
    repoStats.get(key)!.open.add(pr.id)
  })

  // Fetch repo info for each unique repo
  const repos: Repo[] = []
  const repoPromises = []

  for (const [fullName, stats] of repoStats.entries()) {
    const [owner, name] = fullName.split('/')
    repoPromises.push(
      getRepoInfo(owner, name).then((info) => {
        if (info) {
          repos.push({
            owner,
            name,
            fullName,
            stars: info.stargazers_count,
            description: info.description || '',
            mergedCount: stats.merged.size,
            openCount: stats.open.size,
          })
        }
      })
    )
  }

  await Promise.all(repoPromises)

  // Track latest activity per repo
  const repoLatestActivity = new Map<string, Date>()

  filteredMerged.forEach((pr) => {
    const parts = pr.repository_url.split('/')
    const key = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`
    const mergedAt = pr.pull_request.merged_at ? new Date(pr.pull_request.merged_at) : null
    if (mergedAt) {
      const existing = repoLatestActivity.get(key)
      if (!existing || mergedAt > existing) {
        repoLatestActivity.set(key, mergedAt)
      }
    }
  })

  filteredOpen.forEach((pr) => {
    const parts = pr.repository_url.split('/')
    const key = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`
    const createdAt = new Date(pr.created_at)
    const existing = repoLatestActivity.get(key)
    if (!existing || createdAt > existing) {
      repoLatestActivity.set(key, createdAt)
    }
  })

  // Sort by most recent activity
  repos.sort((a, b) => {
    const aActivity = repoLatestActivity.get(a.fullName)
    const bActivity = repoLatestActivity.get(b.fullName)

    // Repos with activity come before those without
    if (!aActivity && !bActivity) return b.stars - a.stars
    if (!aActivity) return 1
    if (!bActivity) return -1

    // Sort by most recent activity first
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
        repo: pr.repository_url.split('/').slice(-2).join('/'),
        mergedAt: pr.pull_request.merged_at || null,
        description: pr.body?.slice(0, 200) || null,
      }))}
      allOpen={open.map((pr) => ({
        id: pr.id,
        title: pr.title,
        number: pr.number,
        url: pr.html_url,
        repo: pr.repository_url.split('/').slice(-2).join('/'),
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
