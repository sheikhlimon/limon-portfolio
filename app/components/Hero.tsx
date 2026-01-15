'use client'

import { motion } from 'framer-motion'
import { BIO, SOCIAL_LINKS } from '../../lib/constants'

export default function Hero() {
  return (
    <section id="about" className="space-y-6 pt-8">
      <motion.h1
        className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Sheikh Limon
      </motion.h1>

      <motion.p
        className="text-xl text-gray-600 dark:text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Software Engineer • Open Source Contributor
      </motion.p>

      <motion.p
        className="text-gray-600 dark:text-gray-300 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {BIO}
      </motion.p>

  
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Find me on</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                className={`flex items-center gap-2 px-2 py-1 border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors ${
                  link.name === 'LinkedIn' ? 'hover:text-blue-600 dark:hover:text-blue-400' : ''
                }`}
                aria-label={link.name}
                title={link.name}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d={link.path} />
                </svg>
                <span>{link.name}</span>
              </a>
            ))}
          </div>

          <div className="pt-4">
            <p className="text-gray-700 dark:text-gray-300">
              Or mail me at{' '}
              <span className="text-gray-600 dark:text-gray-400">sheikhlimon404@gmail.com</span>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
