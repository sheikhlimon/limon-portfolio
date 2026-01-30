'use client'

import { motion } from 'framer-motion'
import { BIO, SOCIAL_LINKS, TITLE, TAGLINE } from '../../lib/constants'

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

      <motion.div
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="font-semibold text-gray-900 dark:text-white text-lg">
          {TITLE}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {TAGLINE}
        </p>
      </motion.div>

      <motion.div
        className="text-gray-600 dark:text-gray-300 max-w-2xl space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {BIO.map((line, lineIndex) => (
          <p
            key={lineIndex}
            className={lineIndex === 2 ? 'mb-0' : lineIndex === 1 ? '-mt-3' : ''}
          >
            {line.map((item, itemIndex) => (
              <span key={itemIndex}>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-gray-900 dark:text-white hover:underline"
                  >
                    {item.text}
                  </a>
                ) : item.bold ? (
                  <span className="font-bold text-gray-900 dark:text-white">
                    {item.text}
                  </span>
                ) : item.italic ? (
                  <span className="italic text-gray-500 dark:text-gray-400">
                    {item.text}
                  </span>
                ) : (
                  item.text
                )}
              </span>
            ))}
          </p>
        ))}
      </motion.div>

  
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
              <span className="text-gray-600 dark:text-gray-400">sheikhlimondev@gmail.com</span>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
