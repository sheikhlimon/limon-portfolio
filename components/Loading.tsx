'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

type LoadingSize = 'full' | 'inline'

interface LoadingProps {
  size?: LoadingSize
  className?: string
}

const MESSAGES = [
  '> Loading...',
  '> Initializing...',
  '> Ready!',
]

export default function Loading({ size = 'inline', className = '' }: LoadingProps) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (size === 'full') {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % MESSAGES.length)
      }, 600)

      return () => clearInterval(interval)
    }
  }, [size])

  const baseStyles = 'font-mono text-sm'
  const sizeStyles = size === 'full' ? 'text-xl text-indigo-500 dark:text-indigo-400' : 'text-xs text-gray-500 dark:text-gray-400'

  if (size === 'full') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 flex items-center justify-center bg-white dark:bg-zinc-950 z-50 ${className}`}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <span className={baseStyles + ' ' + sizeStyles}>
            {MESSAGES[messageIndex]}
          </span>
          <motion.span
            className={baseStyles + ' ' + sizeStyles}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            _
          </motion.span>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={baseStyles + ' ' + sizeStyles}>
        {MESSAGES[0]}
      </span>
      <motion.span
        className={baseStyles + ' ' + sizeStyles}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        _
      </motion.span>
    </div>
  )
}
