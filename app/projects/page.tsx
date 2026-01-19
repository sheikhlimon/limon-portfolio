import { Metadata } from 'next'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../../lib/projects'

export const metadata: Metadata = {
  title: 'Projects - Sheikh Limon',
  description: 'Projects by Sheikh Limon - Full-Stack Developer',
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-5 py-12">
        <div className="space-y-8">
          <h1 className="text-2xl font-bold text-center">Projects</h1>

          <div className="space-y-6">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
