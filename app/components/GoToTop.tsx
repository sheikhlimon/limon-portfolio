'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

export default function GoToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 flex items-center justify-center w-9 h-9 border border-zinc-300/50 dark:border-zinc-600/30 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-zinc-400 dark:hover:border-zinc-500 z-50"
      aria-label="Go to top"
      title="Back to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  )
}
