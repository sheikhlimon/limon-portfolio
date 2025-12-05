'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    try {
      const lenis = new Lenis()
      lenisRef.current = lenis

      function raf(time: number) {
        if (lenisRef.current) {
          lenisRef.current.raf(time)
          requestAnimationFrame(raf)
        }
      }
      requestAnimationFrame(raf)
    } catch (error) {
      console.error('Failed to initialize Lenis smooth scrolling:', error)
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [])

  return <>{children}</>
}
