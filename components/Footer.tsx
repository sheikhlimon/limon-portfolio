"use client"

import { usePathname } from "next/navigation"
import { SITE_CONFIG } from "../lib/constants"

export default function Footer() {
  const pathname = usePathname()
  const isWide = pathname === "/contributions"

  return (
    <footer
      className={`${isWide ? "max-w-[1440px]" : "max-w-4xl"} mx-auto px-5 sm:px-8 pb-8 w-full`}
    >
      <div className="border-t border-dashed border-gray-200 dark:border-gray-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
        <p>2025-present &copy; {SITE_CONFIG.name.toLowerCase()}</p>
        <p className="font-mono text-xs sm:text-sm">built with next.js & bun</p>
      </div>
    </footer>
  )
}
