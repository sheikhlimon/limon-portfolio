"use client"

import { useState, useEffect } from "react"

const LogoTypewriter = () => {
  const [displayText, setDisplayText] = useState("<SL />") // Match server render
  const [showCursor, setShowCursor] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)
  const fullText = "<SL />"

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    let currentIndex = 0
    let timeoutId: NodeJS.Timeout

    const getTypingSpeed = (char: string) => {
      if (char === " ") return 400
      if (char === "<" || char === "/" || char === ">") return 500
      return 700
    }

    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        const currentChar = fullText[currentIndex]
        setDisplayText(fullText.slice(0, currentIndex + 1))
        currentIndex++

        if (currentChar === "L") {
          timeoutId = setTimeout(typeNextChar, 700)
        } else {
          const speed = getTypingSpeed(currentChar)
          timeoutId = setTimeout(typeNextChar, speed)
        }
      } else {
        timeoutId = setTimeout(() => {
          setShowCursor(false)
          setTimeout(() => {
            setDisplayText("")
            setShowCursor(true)
            currentIndex = 0
            timeoutId = setTimeout(typeNextChar, 300)
          }, 300)
        }, 2500)
      }
    }

    setDisplayText("")
    timeoutId = setTimeout(typeNextChar, 800)

    return () => clearTimeout(timeoutId)
  }, [isHydrated])

  // Subtle cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 800)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className="flex items-center whitespace-nowrap leading-none">
      <span className="text-xl text-gray-900 dark:text-white tracking-tight font-display font-bold">
        {displayText}
      </span>
      {/* Terminal underline cursor */}
      <span
        className={`inline-block w-[8px] h-[2px] bg-gray-900 dark:bg-white self-end mb-[2px] ${
          showCursor ? "opacity-100" : "opacity-0"
        } transition-opacity duration-100`}
      />
    </div>
  )
}

export default LogoTypewriter
