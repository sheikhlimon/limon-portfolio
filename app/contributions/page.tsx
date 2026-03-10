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

async function fetchPRs(query: string): Promise<GitHubPR[]> {
  const res = await fetch(
    `https://api.github.com/search/issues?q=author:sheikhlimon+type:pr+${query}&sort=updated&order=desc&per_page=100`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 },
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
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 },
    }
  )

  if (!res.ok) {
    return null
  }

  return res.json()
}

async function ContributionsContent() {
  const [merged, open] = await Promise.all([
    fetchPRs('is:merged'),
    fetchPRs('is:open'),
  ])

  // Filter PRs after November 2025
  const novemberDate = new Date('2025-11-01').getTime()

  const filteredMerged = merged.filter(pr =>
    pr.pull_request.merged_at && new Date(pr.pull_request.merged_at).getTime() >= novemberDate
  )

  const filteredOpen = open.filter(pr =>
    new Date(pr.created_at).getTime() >= novemberDate
  )

  // Group by repo and count
  const repoStats = new Map<string, { merged: Set<number>; open: Set<number> }>()

  filteredMerged.forEach(pr => {
    const parts = pr.repository_url.split('/')
    const owner = parts[parts.length - 2]
    const name = parts[parts.length - 1]
    const key = `${owner}/${name}`
    if (!repoStats.has(key)) {
      repoStats.set(key, { merged: new Set(), open: new Set() })
    }
    repoStats.get(key)!.merged.add(pr.id)
  })

  filteredOpen.forEach(pr => {
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
      getRepoInfo(owner, name).then(info => {
        if (info) {
          repos.push({
            owner,
            name,
            fullName,
            stars: info.stargazers_count,
            description: info.description || '',
            mergedCount: stats.merged.size,
            openCount: stats.open.size,
            pinned: false,
          })
        }
      })
    )
  }

  await Promise.all(repoPromises)

  // Pinned repos (server-side, only you can edit)
  const pinnedRepos = new Set([
    'block/goose',
    'podman-desktop/podman-desktop',
  ])

  // Mark repos as pinned
  repos.forEach(repo => {
    repo.pinned = pinnedRepos.has(repo.fullName)
  })

  // Sort: pinned first, then by stars
  repos.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return b.stars - a.stars
  })

  return (
    <ContributionsClient
      repos={repos}
      allMerged={merged.map(pr => ({
        id: pr.id,
        title: pr.title,
        number: pr.number,
        url: pr.html_url,
        repo: pr.repository_url.split('/').slice(-2).join('/'),
        mergedAt: pr.pull_request.merged_at || null,
        description: pr.body?.slice(0, 200) || null,
      }))}
      allOpen={open.map(pr => ({
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
    <Suspense fallback={<div>Loading...</div>}>
      <ContributionsContent />
    </Suspense>
  )
}