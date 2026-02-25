'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { BIO, SOCIAL_LINKS, TITLE, TAGLINE } from '../../lib/constants'

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('sheikhlimondev@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <section id="about" className="space-y-6 pt-8">
      <motion.h1
        className="text-5xl font-serif tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <span className="text-gray-900 dark:text-white">Sheikh</span>{' '}
        <span className="text-gray-400 dark:text-gray-500">Limon</span>
      </motion.h1>

      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <p className="font-semibold text-gray-900 dark:text-white text-lg font-sans">
          {TITLE}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-base font-sans">
          {TAGLINE}
        </p>
      </motion.div>

      <motion.div
        className="text-gray-600 dark:text-gray-300 max-w-2xl space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      >
        {BIO.map((line, lineIndex) => (
          <motion.p
            key={lineIndex}
            className={lineIndex === 2 ? '-mt-3' : ''}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + lineIndex * 0.1, duration: 0.5 }}
          >
            {line.map((item, itemIndex) => (
              <span key={itemIndex}>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-gray-900 dark:text-white hover:underline transition-all duration-300"
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
          </motion.p>
        ))}
      </motion.div>


      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Find me on</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
                className={`group flex items-center gap-2 px-3 py-2 border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400/50 dark:hover:border-gray-500/50 transition-colors duration-300 ${
                  link.name === 'LinkedIn' ? 'hover:text-blue-600 dark:hover:text-blue-400' : ''
                }`}
                aria-label={link.name}
                title={link.name}
              >
                <svg className="w-4 h-4 transition-opacity duration-300 group-hover:opacity-80" viewBox="0 0 24 24" fill="currentColor">
                  <path d={link.path} />
                </svg>
                <span className="transition-colors">{link.name}</span>
              </motion.a>
            ))}
          </div>

          <motion.div 
            className="pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <p className="text-gray-700 dark:text-gray-300">
              Or mail me at{' '}
              <span className="relative inline-block">
                <button
                  onClick={copyEmail}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-mono text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
                >
                  sheikhlimondev@gmail.com
                </button>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded whitespace-nowrap opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-300">
                  {copied ? 'Copied!' : 'Click to copy'}
                </span>
              </span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
