import ProjectCard from './ProjectCard'
import { projects } from '../../lib/projects'

export default function Projects() {
  const featuredProjects = projects.slice(0, 2)

  return (
    <section id="projects" className="space-y-6">
      <h2 className="text-2xl font-semibold">Featured Projects</h2>

      <div className="max-w-2xl mx-auto space-y-6">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
