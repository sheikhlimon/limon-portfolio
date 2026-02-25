'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="mt-auto py-8"
    >
      <div className="max-w-3xl mx-auto px-5 text-center" suppressHydrationWarning>
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
