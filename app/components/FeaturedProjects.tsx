"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import ProjectCard from "./ProjectCard"
import { projects } from "../../lib/projects"

const featured = projects.slice(0, 3)

export default function FeaturedProjects() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector<HTMLDivElement>(":scope > div")?.offsetWidth ?? 280
    el.scrollBy({ left: dir === "left" ? -cardWidth : cardWidth, behavior: "smooth" })
  }

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white font-display">
        Featured Projects
      </h2>

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/90 border border-zinc-400/70 dark:border-zinc-500/50 shadow-sm hover:shadow-md transition-shadow text-gray-700 dark:text-gray-300 sm:hidden"
            aria-label="Scroll left"
          >
            <CaretLeft className="w-5 h-5" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/90 border border-zinc-400/70 dark:border-zinc-500/50 shadow-sm hover:shadow-md transition-shadow text-gray-700 dark:text-gray-300 sm:hidden"
            aria-label="Scroll right"
          >
            <CaretRight className="w-5 h-5" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 px-1 sm:grid sm:grid-cols-3 sm:overflow-visible sm:scroll-auto sm:px-0 sm:pb-0 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        >
          {featured.map((project, index) => (
            <motion.div
              key={project.title}
              className="min-w-[85vw] snap-center sm:min-w-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <ProjectCard project={project} variant="featured" loading="eager" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
