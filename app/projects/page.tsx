import { Metadata } from 'next'
import ProjectsClient from './projects-client'
import { projects } from '../../lib/projects'

export const metadata: Metadata = {
  title: 'Projects - Sheikh Limon',
  description: 'Projects by Sheikh Limon - Full-Stack Developer',
}

export default function ProjectsPage() {
  return <ProjectsClient projects={projects} />
}
