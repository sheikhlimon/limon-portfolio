"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { GitBranch, Briefcase, Lightning, ArrowUpRight } from "@phosphor-icons/react"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiDocker,
  SiTailwindcss,
  SiGithubactions,
  SiLinux,
  SiVercel,
  SiGit,
  SiFirebase,
} from "react-icons/si"

const techStack = [
  { icon: SiReact, label: "React" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiJavascript, label: "JavaScript" },
  { icon: SiNodedotjs, label: "Node.js" },
  { icon: SiExpress, label: "Express" },
  { icon: SiPostgresql, label: "PostgreSQL" },
  { icon: SiMongodb, label: "MongoDB" },
  { icon: SiPrisma, label: "Prisma" },
  { icon: SiDocker, label: "Docker" },
  { icon: SiTailwindcss, label: "Tailwind" },
  { icon: SiGithubactions, label: "GitHub Actions" },
  { icon: SiLinux, label: "Linux" },
  { icon: SiVercel, label: "Vercel" },
  { icon: SiGit, label: "Git" },
  { icon: SiFirebase, label: "Firebase" },
]

const valueProps = [
  "Full-stack applications from zero to production",
  "Auth systems with role-based access control",
  "APIs designed for real users and real load",
  "Open source contributor — PRs merged into Red Hat & Linux Foundation projects",
]

const openSource = [
  {
    org: "Red Hat",
    project: "Podman Desktop",
    period: "March 2026 — Present",
    repo: "podman-desktop/podman-desktop",
  },
  {
    org: "Linux Foundation",
    project: "Goose",
    badge: "Community All-Star",
    period: "October 2025 — Present",
    repo: "aaif-goose/goose",
  },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export default function ResumeClient() {
  return (
    <motion.div
      className="py-2 pb-12 w-full max-w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
    >
      {/* Header */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3 mb-14"
      >
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-gray-400 dark:text-gray-500">Sheikh</span>{" "}
          <span className="text-gray-900 dark:text-white">Limon</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
          Full-Stack Developer with 1+ years building web applications from scratch. Contributor to
          production codebases at{" "}
          <span className="text-gray-900 dark:text-white font-medium">Red Hat</span> and the{" "}
          <span className="text-gray-900 dark:text-white font-medium">Linux Foundation</span>. Goose
          Community All-Star (January 2026).
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-mono text-gray-500 dark:text-gray-400 pt-1">
          <span>Dhaka, Bangladesh</span>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <span>Open to remote</span>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <span>1+ years experience</span>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-14"
      >
        {/* What I Bring */}
        <motion.section variants={sectionVariants} className="space-y-4">
          <SectionHeader icon={Lightning} label="What I Bring" />
          <ul className="space-y-3">
            {valueProps.map((prop) => (
              <li key={prop} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <span className="text-gray-400 mt-0.5 shrink-0">→</span>
                <span>{prop}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Tech Stack */}
        <motion.section variants={sectionVariants} className="space-y-5">
          <SectionHeader icon={Briefcase} label="Tech Stack" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {techStack.map((tech) => (
              <div
                key={tech.label}
                className="group flex flex-col items-center gap-2 p-3 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200"
              >
                <tech.icon className="w-7 h-7 text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200" />
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                  {tech.label}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Open Source */}
        <motion.section variants={sectionVariants} className="space-y-4">
          <SectionHeader icon={GitBranch} label="Open Source" />
          <div className="space-y-3">
            {openSource.map((entry) => (
              <div
                key={entry.org}
                className="border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h3 className="font-mono font-medium text-gray-900 dark:text-white">
                    {entry.org}
                  </h3>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    — {entry.project}
                  </span>
                  {entry.badge && (
                    <span className="text-xs font-mono px-1.5 py-0.5 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded">
                      {entry.badge}
                    </span>
                  )}
                  <span className="text-sm text-gray-400 dark:text-gray-500 font-mono">
                    {entry.period}
                  </span>
                </div>
                <Link
                  href={`/contributions?repo=${encodeURIComponent(entry.repo)}`}
                  className="inline-flex items-center gap-1 text-sm font-mono text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors shrink-0"
                >
                  View all contributions
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  )
}

function SectionHeader({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-gray-400" weight="bold" />
      <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
        {label}
      </h2>
    </div>
  )
}
