'use client'

import { useState, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import LogoTypewriter from './LogoTypewriter'

const ThemeToggle = dynamic(() => import('../app/components/ThemeToggle'), {
  ssr: false,
  loading: () => <div className="w-9 h-9" />,
})

export default function Navbar() {
  const pathname = usePathname()

  const [activeSection, setActiveSection] = useState('about')

  const navItems = useMemo(
    () => [
      {
        name: 'Logs',
        href: '/logs',
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
      {
        name: 'Projects',
        href: '/projects',
        icon: (
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
      {
        name: 'Resume',
        href: 'https://drive.google.com/file/d/1kpyed0ei3YN30LM5Wpvp5n_xhQsnx0Ou/view?usp=drive_link',
        icon: (
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
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
    <nav className="flex items-center justify-between px-4 sm:px-6 py-4 w-full">
      {/* SVG Logo */}
      <div className="flex items-center">
        <a
          href={pathname === '/' ? '#about' : '/'}
          className="hover:opacity-80 transition-opacity"
          aria-label="Sheikh Limon - Home"
        >
          <LogoTypewriter />
        </a>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center gap-4 sm:gap-6">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              (item.href.startsWith('/') && pathname === item.href) ||
              (item.href.startsWith('#') && currentSection === item.href.substring(1))
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {item.icon}
            <span className="hidden sm:inline">{item.name}</span>
          </a>
        ))}

        {/* Theme Toggle */}
        <div className="sm:ml-6">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
