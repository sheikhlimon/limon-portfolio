"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GitPullRequest } from "@phosphor-icons/react"
import { SITE_CONFIG } from "../lib/constants"
import ThemeToggle from "../app/components/ThemeToggle"

export default function FloatingControls() {
  const pathname = usePathname()

  if (pathname === "/contributions") {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-dashed border-gray-200/80 dark:border-gray-800/80 transition-colors">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 h-13 sm:h-14 flex items-center justify-between">
        <div>
          <Link href="/" className="flex items-center group" aria-label="Home">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-gray-900 dark:text-white transition-opacity group-hover:opacity-70"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              {/* S */}
              <path d="M13 10H7v5h6v5H7" />
              {/* L */}
              <path d="M17 10v10h6" />
              {/* Terminal cursor _ */}
              <path d="M25 20h4" className="animate-pulse" />
            </svg>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <Link
            href="/contributions"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-dashed border-gray-300 dark:border-gray-800 bg-gray-50/90 dark:bg-zinc-900/90 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-700 transition-colors"
            aria-label="Contributions"
            title="Contributions"
          >
            <GitPullRequest
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-900 dark:text-white"
              weight="bold"
            />
            <span>contributions</span>
          </Link>
          <a
            href={`https://github.com/${SITE_CONFIG.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
