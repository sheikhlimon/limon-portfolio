import {
  Terminal,
  Database,
  Globe,
  GitBranch,
  Package,
  Layers,
  Cpu,
  Key,
  Zap,
  CheckCircle,
  Braces,
  Atom,
  Shield,
  FileCode,
  Activity,
} from 'lucide-react'

export default function TechStack() {
  return (
    <section id="tech-stack" className="space-y-6">
      <h2 className="text-2xl font-semibold">Tech Stack</h2>

      <div className="max-w-2xl mx-auto space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <span className="font-bold">Languages & Frameworks:</span>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Braces className="w-4 h-4 text-gray-500" />
              TypeScript
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Cpu className="w-4 h-4 text-gray-500" />
              Node.js
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Zap className="w-4 h-4 text-gray-500" />
              Express
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Atom className="w-4 h-4 text-gray-500" />
              React
            </span>
          </div>
        </div>

        <div>
          <span className="font-bold">Databases:</span>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Database className="w-4 h-4 text-gray-500" />
              MongoDB
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Database className="w-4 h-4 text-gray-500" />
              PostgreSQL
            </span>
          </div>
        </div>

        <div>
          <span className="font-bold">DevOps & Tools:</span>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Terminal className="w-4 h-4 text-gray-500" />
              Linux
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Package className="w-4 h-4 text-gray-500" />
              Docker
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <GitBranch className="w-4 h-4 text-gray-500" />
              Git
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Globe className="w-4 h-4 text-gray-500" />
              GitHub
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Layers className="w-4 h-4 text-gray-500" />
              CI/CD
            </span>
          </div>
        </div>

        <div>
          <span className="font-bold">Concepts:</span>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Globe className="w-4 h-4 text-gray-500" />
              REST APIs
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Key className="w-4 h-4 text-gray-500" />
              JWT Auth
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-gray-500" />
              Input Validation
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Shield className="w-4 h-4 text-gray-500" />
              Fault Tolerance
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <FileCode className="w-4 h-4 text-gray-500" />
              Schema Design
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Activity className="w-4 h-4 text-gray-500" />
              API Reliability
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
