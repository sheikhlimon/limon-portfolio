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

async function fetchGitHub(url: string) {
  const headers: Record<string, string> = { Accept: "application/vnd.github.v3+json" }
  const token = process.env.GITHUB_TOKEN
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  let res = await fetch(url, {
    headers,
    next: { revalidate: 3600 },
  })

  if (res.status === 401) {
    console.warn(`[GitHub API] 401 for ${url}. Falling back to unauthenticated fetch.`)
    res = await fetch(url, {
      headers: { Accept: "application/vnd.github.v3+json" },
      next: { revalidate: 3600 },
    })
  }

  if (!res.ok) {
    console.error(`[GitHub API] Error ${res.status} for ${url}`)
    return null
  }

  return res.json()
}

export async function fetchGitHubPRs(): Promise<PRItem[]> {
  try {
    const { excludedRepos } = SITE_CONFIG.contributions
    const perPage = 100
    const maxPages = 5
    const firstData = await fetchGitHub(
      `https://api.github.com/search/issues?q=author:${SITE_CONFIG.githubUsername}+type:pr&sort=created&order=desc&per_page=${perPage}&page=1`
    )

    if (!firstData) return []
    const allItems: GitHubPR[] = [...(firstData.items || [])]

    const totalCount = firstData.total_count || 0
    const totalPages = Math.min(maxPages, Math.ceil(totalCount / perPage))

    if (totalPages > 1) {
      const pagePromises = []
      for (let page = 2; page <= totalPages; page++) {
        pagePromises.push(
          fetchGitHub(
            `https://api.github.com/search/issues?q=author:${SITE_CONFIG.githubUsername}+type:pr&sort=created&order=desc&per_page=${perPage}&page=${page}`
          )
            .then((data) => (data?.items as GitHubPR[]) || [])
            .catch(() => [] as GitHubPR[])
        )
      }

      const restPages = await Promise.all(pagePromises)
      for (const items of restPages) {
        allItems.push(...items)
      }
    }

    return allItems
      .filter((pr) => {
        const parts = pr.repository_url.split("/")
        const repoFullName = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`
        return !excludedRepos.some((ex) => ex.toLowerCase() === repoFullName.toLowerCase())
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
  const all = [...ghPRs, ...forgePRs]
  all.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  return all
}

export interface ReviewItem {
  id: string
  title: string
  number: number
  html_url: string
  repo: string
  created_at: string
}

async function fetchGitHubItems(query: string, idPrefix: string): Promise<ReviewItem[]> {
  try {
    const data = await fetchGitHub(
      `https://api.github.com/search/issues?q=${query}&sort=created&order=desc&per_page=100`
    )
    if (!data?.items) return []
    return (
      data.items as {
        id: number
        title: string
        number: number
        html_url: string
        repository_url: string
        created_at: string
      }[]
    )
      .map((item) => ({
        id: `${idPrefix}-${item.id}`,
        title: item.title,
        number: item.number,
        html_url: item.html_url,
        repo: item.repository_url.split("/").slice(-2).join("/"),
        created_at: item.created_at,
      }))
      .filter(
        (item) =>
          !SITE_CONFIG.contributions.excludedRepos.some(
            (ex) => ex.toLowerCase() === item.repo.toLowerCase()
          )
      )
  } catch (err) {
    console.error(`Error fetching GitHub items (${idPrefix}):`, err)
    return []
  }
}

export async function fetchGitHubReviews(): Promise<ReviewItem[]> {
  return fetchGitHubItems(`reviewed-by:${SITE_CONFIG.githubUsername}+type:pr`, "gh-review")
}

export async function fetchFedoraForgeReviews(): Promise<ReviewItem[]> {
  try {
    const forgeUser = SITE_CONFIG.githubUsername
    const promises = FEDORA_FORGE_REPOS.map(async (repo) => {
      try {
        const res = await fetch(
          `https://forge.fedoraproject.org/api/v1/repos/${repo}/pulls?state=all&limit=20`,
          {
            next: { revalidate: 3600 },
          }
        )
        if (!res.ok) return []
        const pulls = await res.json()
        if (!Array.isArray(pulls)) return []
        const otherPulls = pulls.filter((p) => p.user?.login !== forgeUser)

        const revPromises = otherPulls.map(async (pull) => {
          try {
            const rRes = await fetch(
              `https://forge.fedoraproject.org/api/v1/repos/${repo}/pulls/${pull.number}/reviews`,
              { next: { revalidate: 3600 } }
            )
            if (!rRes.ok) return []
            const revs = await rRes.json()
            if (!Array.isArray(revs)) return []
            const userRevs = revs.filter((r) => r.user?.login === forgeUser)
            if (userRevs.length === 0) return []
            userRevs.sort(
              (a, b) =>
                new Date(b.submitted_at || b.updated_at).getTime() -
                new Date(a.submitted_at || a.updated_at).getTime()
            )
            const latest = userRevs[0]
            return [
              {
                id: `forge-review-${pull.id}`,
                title: pull.title,
                number: pull.number,
                html_url: latest.html_url || pull.html_url,
                repo,
                created_at: latest.submitted_at || latest.updated_at,
              },
            ]
          } catch {
            return []
          }
        })
        const revResults = await Promise.all(revPromises)
        return revResults.flat()
      } catch {
        return []
      }
    })
    const results = await Promise.all(promises)
    return results.flat()
  } catch (err) {
    console.error("Error fetching Fedora Forge reviews:", err)
    return []
  }
}

export async function fetchAllReviews(): Promise<ReviewItem[]> {
  const [ghReviews, forgeReviews] = await Promise.all([
    fetchGitHubReviews(),
    fetchFedoraForgeReviews(),
  ])
  const all = [...ghReviews, ...forgeReviews]
  return all.toSorted((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export interface IssueItem {
  id: string
  title: string
  number: number
  html_url: string
  repo: string
  created_at: string
}

export async function fetchGitHubIssues(): Promise<IssueItem[]> {
  return fetchGitHubItems(`author:${SITE_CONFIG.githubUsername}+type:issue`, "gh-issue")
}

export async function fetchFedoraForgeIssues(): Promise<IssueItem[]> {
  try {
    const forgeUser = SITE_CONFIG.githubUsername
    const promises = FEDORA_FORGE_REPOS.map(async (repo) => {
      try {
        const res = await fetch(
          `https://forge.fedoraproject.org/api/v1/repos/${repo}/issues?state=all&type=issues`,
          { next: { revalidate: 3600 } }
        )
        if (!res.ok) return []
        const issues = await res.json()
        if (!Array.isArray(issues)) return []
        return issues
          .filter((i) => i.user?.login === forgeUser)
          .map((i) => ({
            id: `forge-issue-${i.id}`,
            title: i.title,
            number: i.number,
            html_url: i.html_url,
            repo,
            created_at: i.created_at,
          }))
      } catch {
        return []
      }
    })
    const results = await Promise.all(promises)
    return results.flat()
  } catch (err) {
    console.error("Error fetching Fedora Forge issues:", err)
    return []
  }
}

export async function fetchAllIssues(): Promise<IssueItem[]> {
  const [ghIssues, forgeIssues] = await Promise.all([fetchGitHubIssues(), fetchFedoraForgeIssues()])
  const all = [...ghIssues, ...forgeIssues]
  return all.toSorted((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}
