"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "@phosphor-icons/react"
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

const techCategories = [
  {
    label: "Languages",
    items: [
      { icon: SiTypescript, label: "TypeScript" },
      { icon: SiJavascript, label: "JavaScript" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { icon: SiReact, label: "React" },
      { icon: SiNextdotjs, label: "Next.js" },
      { icon: SiTailwindcss, label: "Tailwind" },
    ],
  },
  {
    label: "Backend",
    items: [
      { icon: SiNodedotjs, label: "Node.js" },
      { icon: SiExpress, label: "Express" },
      { icon: SiPrisma, label: "Prisma" },
    ],
  },
  {
    label: "Database",
    items: [
      { icon: SiPostgresql, label: "PostgreSQL" },
      { icon: SiMongodb, label: "MongoDB" },
      { icon: SiFirebase, label: "Firebase" },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { icon: SiDocker, label: "Docker" },
      { icon: SiGit, label: "Git" },
      { icon: SiGithubactions, label: "GitHub Actions" },
      { icon: SiLinux, label: "Linux" },
      { icon: SiVercel, label: "Vercel" },
    ],
  },
]

const strengths = [
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
      <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-gray-400 dark:text-gray-500">Sheikh</span>{" "}
          <span className="text-gray-900 dark:text-white">Limon</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mt-4">
          Full-Stack Developer with 1+ years building web applications from scratch. Contributor to
          production codebases at{" "}
          <span className="text-gray-900 dark:text-white font-medium">Red Hat</span> and the{" "}
          <span className="text-gray-900 dark:text-white font-medium">Linux Foundation</span>. Goose
          Community All-Star (January 2026).
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-display text-gray-500 dark:text-gray-400 mt-3">
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
        className="space-y-10"
      >
        {/* Strengths */}
        <motion.section variants={sectionVariants}>
          <SectionDivider number="01" label="Strengths" />
          <div className="mt-5 space-y-3">
            {strengths.map((text) => (
              <div
                key={text}
                className="pl-3 border-l-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
              >
                {text}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section variants={sectionVariants}>
          <SectionDivider number="02" label="Stack" />
          <div className="mt-5 space-y-5">
            {techCategories.map((category) => (
              <div key={category.label}>
                <h3 className="font-display text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {category.items.map((tech) => (
                    <span
                      key={tech.label}
                      className="inline-flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <tech.icon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      {tech.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Open Source */}
        <motion.section variants={sectionVariants}>
          <SectionDivider number="03" label="Open Source" />
          <div className="mt-5 space-y-3">
            {openSource.map((entry) => (
              <div
                key={entry.org}
                className="border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <h3 className="font-display font-medium text-gray-900 dark:text-white">
                      {entry.org}
                    </h3>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      — {entry.project}
                    </span>
                    {entry.badge && (
                      <span className="text-xs font-display px-1.5 py-0.5 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded">
                        {entry.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 dark:text-gray-500 font-display mt-1 ml-3.5">
                    {entry.period}
                  </p>
                </div>
                <Link
                  href={`/contributions?repo=${encodeURIComponent(entry.repo)}`}
                  className="inline-flex items-center gap-1 text-sm font-display text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors shrink-0"
                >
                  View contributions
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

function SectionDivider({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-xs text-gray-300 dark:text-gray-700">{number}</span>
      <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
      <h2 className="font-display text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
        {label}
      </h2>
    </div>
  )
}
