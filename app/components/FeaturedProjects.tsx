"use client"

import { motion } from "framer-motion"
import ProjectCard from "./ProjectCard"
import { projects } from "../../lib/projects"

const featured = projects.slice(0, 3)

export default function FeaturedProjects() {
  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white font-display">
        Featured Projects
      </h2>

      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
        {featured.map((project, index) => (
          <motion.div
            key={project.title}
            className="min-w-[280px] snap-center sm:min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <ProjectCard project={project} variant="featured" loading="eager" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
