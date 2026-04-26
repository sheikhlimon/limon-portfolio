"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import { Article, Folder, FileText, GithubLogo } from "@phosphor-icons/react"
import LogoTypewriter from "./LogoTypewriter"

const ThemeToggle = dynamic(() => import("../app/components/ThemeToggle"), {
  ssr: false,
  loading: () => <div className="w-9 h-9" />,
})

const navItems = [
  {
    name: "Blog",
    href: "/posts",
    icon: Article,
    showLabel: true,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: Folder,
    showLabel: true,
  },
  {
    name: "Resume",
    href: "/resume",
    icon: FileText,
    showLabel: true,
  },
  {
    name: "GitHub",
    href: "https://github.com/sheikhlimon",
    icon: GithubLogo,
    showLabel: false,
  },
]

export default function Navbar() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    if (pathname !== "/") return

    const handleScroll = () => {
      const sections = navItems
        .map((item) => item.href.substring(1))
        .filter((s) => s && !s.includes("/"))
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

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 h-16 w-full">
      <div className="flex items-center min-w-20">
        <Link
          href={pathname === "/" ? "#about" : "/"}
          className="hover:opacity-80 transition-opacity duration-300"
          aria-label="Sheikh Limon - Home"
        >
          <LogoTypewriter />
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        {navItems.map((item) => {
          const Icon = item.icon
          const hrefPath = item.href.split("?")[0]
          const isActive =
            (item.href.startsWith("/") && pathname === hrefPath) ||
            (item.href.startsWith("#") && activeSection === item.href.substring(1))

          const isExternal = item.href.startsWith("http")
          const LinkTag = isExternal ? "a" : Link

          return (
            <LinkTag
              key={item.name}
              href={item.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={`group relative inline-flex items-center font-mono text-base font-medium py-1 transition-colors duration-200 ${
                isActive
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {item.showLabel === false ? (
                <Icon className="w-5 h-5" />
              ) : (
                <>
                  <span className="hidden sm:inline">{item.name}</span>
                  <Icon className="sm:hidden w-5 h-5" />
                </>
              )}
              {item.showLabel && (
                <span
                  className={`absolute bottom-0 left-0 h-px bg-gray-900 dark:bg-white transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              )}
            </LinkTag>
          )
        })}

        <ThemeToggle />
      </div>
    </nav>
  )
}
