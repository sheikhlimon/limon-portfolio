"use client"

import { useState } from "react"
import { SOCIAL_LINKS, SITE_CONFIG } from "../../lib/constants"

function RepoBadge({
  repo,
  href,
  className = "",
}: {
  repo: string
  href: string
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-mono inline-flex min-w-0 max-w-full items-center rounded-full border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 px-2 py-0.5 text-xs sm:text-[13px] text-gray-600 dark:text-gray-300 transition-colors hover:border-gray-400 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-white ${className}`}
    >
      <span className="truncate">{repo}</span>
    </a>
  )
}

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <section id="about" className="pt-8 sm:pt-10 space-y-6">
      <div className="flex items-center gap-4 sm:gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://github.com/${SITE_CONFIG.githubUsername}.png`}
          alt={SITE_CONFIG.name}
          width={64}
          height={64}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-gray-200 dark:border-gray-800 shrink-0 bg-gray-100 dark:bg-zinc-800 object-cover"
        />
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            <span className="text-gray-400 dark:text-gray-500">{SITE_CONFIG.firstName}</span>{" "}
            <span className="text-gray-900 dark:text-white">{SITE_CONFIG.lastName}</span>
          </h1>
          <div className="flex items-center gap-2 flex-wrap text-sm sm:text-base">
            <a
              href={`https://github.com/${SITE_CONFIG.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              @{SITE_CONFIG.githubUsername}
            </a>
            <span className="text-gray-300 dark:text-gray-700">·</span>
            <span className="text-gray-500 dark:text-gray-400">fedora apps maintainer</span>
          </div>
        </div>
      </div>

      <div className="text-gray-700 dark:text-gray-300 space-y-4">
        <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
          Hey, I'm Limon. I maintain applications for the Fedora Project and contribute across
          open-source codebases.
        </p>

        <div className="space-y-2.5 text-sm sm:text-base pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
            <span className="text-gray-400 dark:text-gray-500 sm:w-28 shrink-0 font-medium">
              maintainer
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <RepoBadge
                repo="apps/packager_dashboard"
                href="https://forge.fedoraproject.org/apps/packager_dashboard"
              />
              <RepoBadge
                repo="apps/oraculum"
                href="https://forge.fedoraproject.org/apps/oraculum"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
            <span className="text-gray-400 dark:text-gray-500 sm:w-28 shrink-0 font-medium">
              contributed
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <RepoBadge repo="anitya" href="https://github.com/fedora-infra/anitya" />
              <RepoBadge
                repo="podman-desktop"
                href="https://github.com/podman-desktop/podman-desktop"
              />
              <RepoBadge repo="goose" href="https://github.com/aaif-goose/goose" />
            </div>
          </div>
        </div>

        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed pt-1">
          When I'm not submitting PRs, I write about what I learn and build things to scratch my own
          itch.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-3 border-t border-dashed border-gray-200 dark:border-gray-800/80 text-sm sm:text-base">
        <span className="font-medium text-gray-400 dark:text-gray-500">reach me:</span>
        <button
          onClick={copyEmail}
          className="font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          {copied ? "copied!" : "email"}
        </button>
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {link.name.toLowerCase()}
          </a>
        ))}
      </div>
    </section>
  )
}
