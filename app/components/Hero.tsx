"use client"

import { useState } from "react"
import { SOCIAL_LINKS, SITE_CONFIG } from "../../lib/constants"

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <section id="about" className="space-y-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-display">
          <span className="text-gray-400 dark:text-gray-500">{SITE_CONFIG.firstName}</span>{" "}
          <span className="text-gray-900 dark:text-white">{SITE_CONFIG.lastName}</span>
        </h1>
        <p className="text-base font-display text-gray-500 dark:text-gray-400 mt-1">
          open source engineer
        </p>
      </div>

      <div className="text-gray-700 dark:text-gray-300 space-y-4 text-base leading-relaxed max-w-xl">
        <p>
          Hey, I'm Limon. I spend my time collaborating on open-source codebases and leveraging AI
          to build and ship things faster.
        </p>

        <ul className="space-y-2 text-sm sm:text-base">
          <li className="flex items-start gap-2">
            <span>🛠️</span>
            <span>
              <strong className="font-semibold text-gray-900 dark:text-white font-display">
                Maintainer:
              </strong>{" "}
              Fedora Apps (
              <a
                href="https://forge.fedoraproject.org/apps/packager_dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white underline decoration-gray-400 dark:decoration-gray-600 hover:decoration-gray-900 dark:hover:decoration-white transition-colors"
              >
                Packager Dashboard
              </a>
              ,{" "}
              <a
                href="https://forge.fedoraproject.org/apps/oraculum"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white underline decoration-gray-400 dark:decoration-gray-600 hover:decoration-gray-900 dark:hover:decoration-white transition-colors"
              >
                Oraculum
              </a>
              )
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>🔌</span>
            <span>
              <strong className="font-semibold text-gray-900 dark:text-white font-display">
                Contributor:
              </strong>{" "}
              <a
                href="https://github.com/fedora-infra/anitya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white underline decoration-gray-400 dark:decoration-gray-600 hover:decoration-gray-900 dark:hover:decoration-white transition-colors"
              >
                Anitya
              </a>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>📦</span>
            <span>
              <strong className="font-semibold text-gray-900 dark:text-white font-display">
                Past Contributions:
              </strong>{" "}
              <a
                href="https://github.com/aaif-goose/goose"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white underline decoration-gray-400 dark:decoration-gray-600 hover:decoration-gray-900 dark:hover:decoration-white transition-colors"
              >
                goose
              </a>{" "}
              &{" "}
              <a
                href="https://github.com/podman-desktop/podman-desktop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white underline decoration-gray-400 dark:decoration-gray-600 hover:decoration-gray-900 dark:hover:decoration-white transition-colors"
              >
                Podman Desktop
              </a>
            </span>
          </li>
        </ul>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          When I'm not submitting PRs, I write about what I learn and build things to scratch my own
          itch.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-4">
        <span className="text-sm font-display text-gray-400 dark:text-gray-500">reach me:</span>
        <button
          onClick={copyEmail}
          className="font-display text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          {copied ? "copied!" : "email"}
        </button>
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {link.name.toLowerCase()}
          </a>
        ))}
      </div>
    </section>
  )
}
