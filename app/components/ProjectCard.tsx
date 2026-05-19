"use client"

import Image from "next/image"
import {
  Globe,
  Shield,
  GraduationCap,
  Cube,
  Terminal,
  Briefcase,
  ArrowUpRight,
  GithubLogo,
} from "@phosphor-icons/react"
import { Project } from "../../lib/projects"

interface ProjectCardProps {
  project: Project
}

const iconMap = {
  Globe,
  Shield,
  GraduationCap,
  Cube,
  Terminal,
  Briefcase,
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const Icon = iconMap[project.icon]

  return (
    <div className="group flex flex-col h-full border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      {project.image ? (
        <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover scale-105 transition-transform duration-300 group-hover:scale-100"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
          <Icon className="w-12 h-12 text-gray-400 dark:text-gray-500" weight="duotone" />
        </div>
      )}

      <div className="p-4 flex flex-col flex-1 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-display flex items-center gap-2">
          <Icon className="w-4 h-4 flex-shrink-0" />
          <span className="break-words">{project.title}</span>
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center gap-3">
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

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
