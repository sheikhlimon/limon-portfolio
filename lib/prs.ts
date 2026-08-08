import { SITE_CONFIG } from "./constants"

export interface PRItem {
  id: string
  title: string
  number: number
  html_url: string
  repo: string
  created_at: string
  merged_at: string | null
  state: "open" | "closed"
  isMerged: boolean
  provider: "github" | "forge"
  body?: string | null
}

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
  body?: string | null
}

interface ForgejoPR {
  id: number
  html_url: string
  title: string
  number: number
  state: string
  created_at: string
  merged_at: string | null
  merged: boolean
  body?: string | null
  user: {
    login: string
  }
  base: {
    repo: {
      full_name: string
    }
  }
}

const FEDORA_FORGE_REPOS = ["apps/packager_dashboard", "apps/oraculum", "infra/ansible"]

export async function fetchGitHubPRs(): Promise<PRItem[]> {
  try {
    const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" }
    const token = process.env.GITHUB_TOKEN
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(
      `https://api.github.com/search/issues?q=author:${SITE_CONFIG.githubUsername}+type:pr&sort=created&order=desc&per_page=50`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    )

    if (!res.ok) return []
    const data = await res.json()
    const items: GitHubPR[] = data.items || []

    const { excludedRepos } = SITE_CONFIG.contributions

    return items
      .filter((pr) => {
        const parts = pr.repository_url.split("/")
        const repoFullName = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`
        return !excludedRepos.includes(repoFullName)
      })
      .map((pr) => {
        const parts = pr.repository_url.split("/")
        const repo = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`
        const isMerged = !!pr.pull_request?.merged_at
        return {
          id: `gh-${pr.id}`,
          title: pr.title,
          number: pr.number,
          html_url: pr.html_url,
          repo,
          created_at: pr.created_at,
          merged_at: pr.pull_request?.merged_at || null,
          state: pr.state === "open" ? "open" : "closed",
          isMerged,
          provider: "github",
          body: pr.body || null,
        }
      })
  } catch (err) {
    console.error("Error fetching GitHub PRs:", err)
    return []
  }
}

export async function fetchFedoraForgePRs(): Promise<PRItem[]> {
  try {
    const forgeUser = SITE_CONFIG.githubUsername
    const prPromises = FEDORA_FORGE_REPOS.map(async (repo) => {
      try {
        const res = await fetch(
          `https://forge.fedoraproject.org/api/v1/repos/${repo}/pulls?state=all`,
          {
            next: { revalidate: 3600 },
          }
        )
        if (!res.ok) return []
        const pulls: ForgejoPR[] = await res.json()
        if (!Array.isArray(pulls)) return []
        return pulls
          .filter((p) => p.user?.login === forgeUser)
          .map((p) => ({
            id: `forge-${p.id}`,
            title: p.title,
            number: p.number,
            html_url: p.html_url,
            repo: p.base?.repo?.full_name || repo,
            created_at: p.created_at,
            merged_at: p.merged_at || null,
            state: p.state === "open" ? ("open" as const) : ("closed" as const),
            isMerged: p.merged || !!p.merged_at,
            provider: "forge" as const,
            body: p.body || null,
          }))
      } catch {
        return []
      }
    })

    const results = await Promise.all(prPromises)
    return results.flat()
  } catch (err) {
    console.error("Error fetching Fedora Forge PRs:", err)
    return []
  }
}

export async function fetchAllPRs(): Promise<PRItem[]> {
  const [ghPRs, forgePRs] = await Promise.all([fetchGitHubPRs(), fetchFedoraForgePRs()])
  const all = [...ghPRs, ...forgePRs].filter((pr) => pr.state === "open" || pr.isMerged)
  all.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  return all
}
