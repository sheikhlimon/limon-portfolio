"use client"

import { Globe, Shield, GraduationCap, Cube, Terminal, Briefcase } from "@phosphor-icons/react"
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
    <a
      href={project.live}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg p-4 hover:border-gray-400/50 dark:hover:border-gray-500/50 hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
    >
      <div className="flex items-center mb-3 gap-2">
        <div className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 flex items-center gap-2">
          <Icon className="w-4 h-4 flex-shrink-0 transition-opacity duration-300 group-hover:opacity-80" />
          <span className="break-words">{project.title}</span>
        </div>
      </div>

      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        <p className="text-base">{project.description}</p>

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

        <ul className="text-base space-y-1">
          {project.features.map((feature) => (
            <li key={feature}>• {feature}</li>
          ))}
        </ul>
      </div>
    </a>
  )
}
