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
      // Different speeds for different characters to feel more natural
      if (char === ' ') return 150 // Space - quick
      if (char === '<' || char === '/' || char === '>') return 200 // Symbols - medium
      return 180 + 50 // Letters - fixed speed to avoid hydration mismatch
    }

    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        const currentChar = fullText[currentIndex]
        setDisplayText(fullText.slice(0, currentIndex + 1))
        currentIndex++

        // Add pause after "<SL" before typing "/>"
        if (currentChar === 'L') {
          timeoutId = setTimeout(typeNextChar, 400)
        } else {
          const speed = getTypingSpeed(currentChar)
          timeoutId = setTimeout(typeNextChar, speed)
        }
      } else {
        // Pause when complete, then restart with cursor off briefly
        timeoutId = setTimeout(() => {
          setShowCursor(false)
          setTimeout(() => {
            setDisplayText('')
            setShowCursor(true)
            currentIndex = 0
            timeoutId = setTimeout(typeNextChar, 200)
          }, 300)
        }, 3500)
      }
    }

    // Start typing after hydration
    setDisplayText('')
    timeoutId = setTimeout(typeNextChar, 150)

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
        className="text-xl font-bold text-gray-900 dark:text-white tracking-wide"
        style={{ fontFamily: 'var(--font-cursive), cursive' }}
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
