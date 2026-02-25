'use client'

import { Globe, Shield, GraduationCap, Server } from 'lucide-react'
import { Project } from '../../lib/projects'

interface ProjectCardProps {
  project: Project
}

const iconMap = {
  Globe,
  Shield,
  GraduationCap,
  Server,
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const Icon = iconMap[project.icon]

  return (
    <div suppressHydrationWarning className="group border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg p-4 hover:border-gray-400/50 dark:hover:border-gray-500/50 hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      <div className="flex items-center justify-between mb-3 gap-2">
        <a
          href={project.live || project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-semibold group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 flex items-center gap-2"
        >
          <Icon className="w-4 h-4 flex-shrink-0 transition-opacity duration-300 group-hover:opacity-80" />
          <span className="break-words">{project.title}</span>
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-2 py-1 border border-zinc-400/70 dark:border-zinc-500/50 rounded hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400/50 dark:hover:border-gray-500/50 hover:text-gray-900 dark:hover:text-white transition-all duration-300 flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          GitHub →
        </a>
      </div>

      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        <p className="text-sm">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-1 px-2 py-1 text-xs border border-zinc-400/70 dark:border-zinc-500/50 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        <ul className="text-sm space-y-1">
          {project.features.map((feature) => (
            <li key={feature}>• {feature}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
