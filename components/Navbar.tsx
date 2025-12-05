"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "../app/components/ThemeToggle";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const pathname = usePathname();

  const navItems = [
    {
      name: "Blog",
      href: "/blog",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      )
    },
    {
      name: "Projects",
      href: "/projects",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      )
    },
  ];

  useEffect(() => {
    // Set active based on current path
    if (pathname === "/projects") {
      setActiveSection("projects");
    } else {
      setActiveSection("about");
    }

    // Handle scroll for anchor links on home page
    const handleScroll = () => {
      if (pathname !== "/") return;

      const sections = navItems.map(item => item.href.substring(1)).filter(s => s && !s.includes("/"));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <nav className="flex items-center justify-between px-6 py-4 w-full">
      {/* SVG Logo */}
      <div className="flex items-center">
        <a
          href={pathname === "/" ? "#about" : "/"}
          className="hover:opacity-80 transition-opacity"
          aria-label="Sheikh Limon - Home"
        >
          <svg
            className="w-12 h-12 text-gray-900 dark:text-white"
            viewBox="0 0 40 40"
            fill="none"
          >
            {/* Animated SL text */}
            <text x="20" y="26" fontSize="18" fontWeight="bold" textAnchor="middle" fill="currentColor" fontFamily="system-ui">
              S<tspan opacity="1">
                L
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </tspan>
            </text>
          </svg>
        </a>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              (item.href.startsWith("/") && pathname === item.href) ||
              (item.href.startsWith("#") && activeSection === item.href.substring(1))
                ? "text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
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
  );
}