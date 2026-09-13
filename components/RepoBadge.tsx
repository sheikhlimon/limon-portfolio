export default function RepoBadge({ repo, className = "" }: { repo: string; className?: string }) {
  const isForge = repo.startsWith("apps/") || repo.startsWith("infra/")
  const href = isForge ? `https://forge.fedoraproject.org/${repo}` : `https://github.com/${repo}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-mono inline-flex min-w-0 max-w-full items-center rounded-full border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400 transition-colors hover:border-gray-400 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-white ${className}`}
    >
      <span className="truncate">{repo}</span>
    </a>
  )
}
