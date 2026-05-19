"use client"

import { motion } from "framer-motion"
import { SOCIAL_LINKS } from "../lib/constants"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="mt-auto py-8"
    >
      <div className="max-w-3xl mx-auto px-5 text-center" suppressHydrationWarning>
        <div className="flex items-center justify-center gap-5 mb-3">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              aria-label={link.name}
              title={link.name}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d={link.path} />
              </svg>
            </a>
          ))}
        </div>
        <motion.p
          className="text-sm text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          2025-PRESENT © Sheikh Limon
        </motion.p>
      </div>
    </motion.footer>
  )
}
