"use client"

import Image from "next/image"
import {
  Cube,
  Shield,
  Briefcase,
  GraduationCap,
  Globe,
  Terminal,
  ArrowUpRight,
  GithubLogo,
} from "@phosphor-icons/react"
import { projects } from "../../lib/projects"

const iconMap = {
  Globe,
  Shield,
  GraduationCap,
  Cube,
  Terminal,
  Briefcase,
}

const featured = projects.slice(0, 3)

export default function FeaturedProjects() {
  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white font-display">
        Featured Projects
      </h2>

      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
        {featured.map((project) => {
          const Icon = iconMap[project.icon]
          return (
            <div
              key={project.title}
              className="min-w-[280px] snap-center sm:min-w-0 border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 flex flex-col"
            >
              {project.image ? (
                <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover scale-105 transition-transform duration-300 group-hover:scale-100"
                    sizes="(max-width: 640px) 280px, 33vw"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                  <Icon className="w-12 h-12 text-gray-400 dark:text-gray-500" weight="duotone" />
                </div>
              )}

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-display">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 flex-1">
                  {project.description}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-sans text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                      Live
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-sans text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    <GithubLogo className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
