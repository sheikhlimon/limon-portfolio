'use client'

import { useState, useEffect } from 'react'

const LogoTypewriter = () => {
  const [displayText, setDisplayText] = useState('<SL />') // Match server render
  const [showCursor, setShowCursor] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)
  const fullText = '<SL />'

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    let currentIndex = 0
    let timeoutId: NodeJS.Timeout

    const getTypingSpeed = (char: string) => {
      if (char === ' ') return 300
      if (char === '<' || char === '/' || char === '>') return 400
      return 500
    }

    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        const currentChar = fullText[currentIndex]
        setDisplayText(fullText.slice(0, currentIndex + 1))
        currentIndex++

        if (currentChar === 'L') {
          timeoutId = setTimeout(typeNextChar, 500)
        } else {
          const speed = getTypingSpeed(currentChar)
          timeoutId = setTimeout(typeNextChar, speed)
        }
      } else {
        timeoutId = setTimeout(() => {
          setShowCursor(false)
          setTimeout(() => {
            setDisplayText('')
            setShowCursor(true)
            currentIndex = 0
            timeoutId = setTimeout(typeNextChar, 150)
          }, 150)
        }, 1500)
      }
    }

    setDisplayText('')
    timeoutId = setTimeout(typeNextChar, 500)

    return () => clearTimeout(timeoutId)
  }, [isHydrated])

  // Subtle cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 600)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className="flex items-center justify-center whitespace-nowrap">
      <span
        className="text-lg text-gray-900 dark:text-white tracking-tight font-mono"
      >
        {displayText}
      </span>
      {/* Retro underscore cursor */}
      <span
        className={`inline-block ml-0.5 text-gray-900 dark:text-white font-bold ${
          showCursor ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-200`}
      >
        _
      </span>
    </div>
  )
}

export default LogoTypewriter
