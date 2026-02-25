'use client'

import { useState, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { BookOpen, Folder, FileText, Github } from 'lucide-react'
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
        name: 'Blog',
        href: '/posts',
        icon: BookOpen,
        showLabel: true,
      },
      {
        name: 'Projects',
        href: '/projects',
        icon: Folder,
        showLabel: true,
      },
      {
        name: 'Resume',
        href: 'https://drive.google.com/file/d/1kpyed0ei3YN30LM5Wpvp5n_xhQsnx0Ou/view?usp=drive_link',
        icon: FileText,
        showLabel: true,
      },
      {
        name: 'GitHub',
        href: 'https://github.com/sheikhlimon',
        icon: Github,
        showLabel: false,
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
          className="hover:opacity-80 transition-opacity duration-300"
          aria-label="Sheikh Limon - Home"
        >
          <LogoTypewriter />
        </a>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center gap-5 sm:gap-6">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = (item.href.startsWith('/') && pathname === item.href) ||
            (item.href.startsWith('#') && currentSection === item.href.substring(1))

          return (
            <a
              key={item.name}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`group relative font-mono text-sm transition-all duration-300 ${
                isActive
                  ? 'font-bold text-gray-900 dark:text-white'
                  : 'font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {item.showLabel === false ? (
                <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-gray-900 dark:text-white' : ''}`} />
              ) : (
                <>
                  <span className="hidden sm:inline">{item.name}</span>
                  <Icon className={`sm:hidden w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-gray-900 dark:text-white' : ''}`} />
                </>
              )}
              {/* Underline animation for desktop */}
              {item.showLabel && (
                <span className={`absolute -bottom-1 left-0 h-px bg-gray-900 dark:bg-white transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              )}
            </a>
          )
        })}

        {/* Theme Toggle */}
        <div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
