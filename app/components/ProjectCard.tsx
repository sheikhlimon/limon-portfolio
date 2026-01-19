'use client'

import { Globe, Shield, GraduationCap } from 'lucide-react'
import { Project } from '../../lib/projects'

interface ProjectCardProps {
  project: Project
}

const iconMap = {
  Globe,
  Shield,
  GraduationCap,
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const Icon = iconMap[project.icon]

  return (
    <a
      href={project.live || project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg p-4 hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/5 group hover:scale-[1.02] hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {project.title}
        </h3>
        {project.live && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-2 py-1 border border-zinc-400/70 dark:border-zinc-500/50 rounded hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:border-indigo-400/50 dark:hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub →
          </a>
        )}
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
    </a>
  )
}
