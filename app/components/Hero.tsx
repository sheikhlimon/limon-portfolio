"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { GitPullRequest, ArrowRight } from "@phosphor-icons/react"
import { BIO, SOCIAL_LINKS, SITE_CONFIG } from "../../lib/constants"

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }
  return (
    <section id="about" className="space-y-6 pt-2 sm:pt-8">
      <motion.h1
        className="text-5xl font-bold tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <span className="text-gray-400 dark:text-gray-500">{SITE_CONFIG.firstName}</span>{" "}
        <span className="text-gray-900 dark:text-white">{SITE_CONFIG.lastName}</span>
      </motion.h1>

      <motion.div
        className="text-gray-700 dark:text-gray-300 max-w-3xl space-y-4 text-lg leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      >
        {BIO.map((line, lineIndex) => (
          <motion.p
            key={line.map((i) => i.text).join("")}
            className=""
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + lineIndex * 0.1, duration: 0.5 }}
          >
            {line.map((item) => (
              <span key={item.text + (item.link ?? "")}>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 dark:text-white underline decoration-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-300"
                  >
                    {item.text}
                  </a>
                ) : item.bold ? (
                  <span className="font-bold text-gray-700 dark:text-gray-200">{item.text}</span>
                ) : item.italic ? (
                  <span className="italic text-gray-500 dark:text-gray-400">{item.text}</span>
                ) : (
                  item.text
                )}
              </span>
            ))}
          </motion.p>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-wrap items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <Link
          href="/contributions"
          className="group inline-flex items-center gap-2 text-lg font-display text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
        >
          <GitPullRequest className="w-5 h-5 text-purple-500 dark:text-purple-400" />
          <span className="underline decoration-gray-400 group-hover:decoration-gray-900 dark:group-hover:decoration-white">
            View all open source contributions
          </span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>

      <motion.div
        className="space-y-4 pt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <h3 className="text-2xl font-medium text-gray-900 dark:text-white font-display">
          Find me on
        </h3>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-lg">
            {SOCIAL_LINKS.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
                className="group relative font-display text-lg transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                aria-label={link.name}
                title={link.name}
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 transition-opacity duration-300 group-hover:opacity-80"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={link.path} />
                  </svg>
                  <span className="transition-colors">{link.name}</span>
                </span>
                <span className="absolute -bottom-1 left-0 h-px bg-gray-900 dark:bg-white transition-all duration-300 w-0 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <motion.div
            className="pt-4 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <p className="text-base text-gray-700 dark:text-gray-300 flex flex-wrap items-baseline gap-x-1 font-display">
              <span>Or mail me at</span>
              <span className="relative inline-block font-sans">
                <button
                  onClick={copyEmail}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
                >
                  {copied ? "Copied!" : SITE_CONFIG.email}
                </button>
                <span
                  className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded whitespace-nowrap pointer-events-none transition-opacity duration-300 ${copied ? "opacity-100" : "opacity-0"}`}
                >
                  {copied ? "Copied!" : "Click to copy"}
                </span>
              </span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
