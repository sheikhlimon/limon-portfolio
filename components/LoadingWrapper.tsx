'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loading from './Loading'

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loading size="full" />}
      </AnimatePresence>
      {!isLoading && children}
    </>
  )
}
