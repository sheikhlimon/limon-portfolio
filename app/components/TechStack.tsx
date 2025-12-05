import {
  Terminal,
  Database,
  Globe,
  GitBranch,
  Package,
  Server,
  Layers,
  Cpu,
  Key,
  Users,
  Zap,
  CheckCircle,
  Braces,
  Atom,
} from 'lucide-react'

export default function TechStack() {
  return (
    <section id="tech-stack" className="space-y-6">
      <h2 className="text-2xl font-semibold">Tech Stack</h2>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <span className="font-bold">OS & Tools:</span>
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
              CI/CD
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Globe className="w-4 h-4 text-gray-500" />
              Vercel
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Server className="w-4 h-4 text-gray-500" />
              Netlify
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Layers className="w-4 h-4 text-gray-500" />
              Render
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
          <span className="font-bold">Languages/Frameworks:</span>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Terminal className="w-4 h-4 text-gray-500" />
              Bash
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Braces className="w-4 h-4 text-gray-500" />
              JavaScript/TypeScript
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
          <span className="font-bold">Concepts:</span>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Globe className="w-4 h-4 text-gray-500" />
              REST APIs
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Key className="w-4 h-4 text-gray-500" />
              JWT Authentication
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Layers className="w-4 h-4 text-gray-500" />
              MVC
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Users className="w-4 h-4 text-gray-500" />
              Agile
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-gray-500" />
              Testing
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-sm border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg">
              <Cpu className="w-4 h-4 text-gray-500" />
              Performance Optimization
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
