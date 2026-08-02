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
          Hey, I'm Limon. I spend most of my time reading other people's code and trying to make it
          better. Right now I'm contributing to{" "}
          <a
            href="https://github.com/fedora-infra"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-white underline decoration-gray-400 dark:decoration-gray-600 hover:decoration-gray-900 dark:hover:decoration-white transition-colors"
          >
            fedora-infra
          </a>{" "}
          &mdash; mainly working on the packager dashboard and other infrastructure tooling.
        </p>
        <p>
          Before that, I was deep in{" "}
          <a
            href="https://github.com/block/goose"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-white underline decoration-gray-400 dark:decoration-gray-600 hover:decoration-gray-900 dark:hover:decoration-white transition-colors"
          >
            goose
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/podman-desktop/podman-desktop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-white underline decoration-gray-400 dark:decoration-gray-600 hover:decoration-gray-900 dark:hover:decoration-white transition-colors"
          >
            Podman Desktop
          </a>
          . When I'm not submitting PRs, I write about what I learn and build things to scratch my
          own itch.
        </p>
      </div>

      <div className="flex flex-col gap-4 pt-2">
        <div className="relative inline-block">
          <button
            onClick={copyEmail}
            className="font-display text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            {copied ? "copied!" : SITE_CONFIG.email}
          </button>
        </div>

        <div className="flex items-center gap-4">
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
      </div>
    </section>
  )
}
