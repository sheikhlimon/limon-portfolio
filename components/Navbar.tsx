'use client'

import { useState, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import ThemeToggle from '../app/components/ThemeToggle'

export default function Navbar() {
  const pathname = usePathname()

  
  const [activeSection, setActiveSection] = useState('about')

  const navItems = useMemo(
    () => [
      {
        name: 'Blog',
        href: '/blog',
        icon: (
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        ),
      },
    ],
    []
  )

  const currentSection = useMemo(() => {
    return activeSection !== 'about' ? activeSection : 'about'
  }, [activeSection])

  useEffect(() => {
    // Handle scroll for anchor links on home page
    const handleScroll = () => {
      if (pathname !== '/') return

      const sections = navItems
        .map((item) => item.href.substring(1))
        .filter((s) => s && !s.includes('/'))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname, navItems])

  return (
    <nav className="flex items-center justify-between px-6 py-4 w-full">
      {/* SVG Logo */}
      <div className="flex items-center">
        <a
          href={pathname === '/' ? '#about' : '/'}
          className="hover:opacity-80 transition-opacity"
          aria-label="Sheikh Limon - Home"
        >
          <img
            src="/logo.svg"
            alt="SL Logo"
            className="w-12 h-12 invert dark:invert-0"
          />
        </a>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              (item.href.startsWith('/') && pathname === item.href) ||
              (item.href.startsWith('#') && currentSection === item.href.substring(1))
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {item.icon}
            {item.name}
          </a>
        ))}

        {/* Theme Toggle */}
        <div className="ml-6">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
