import { Metadata } from "next"
import ProjectsClient from "./projects-client"
import { projects } from "../../lib/projects"
import { SITE_CONFIG } from "../../lib/constants"

export const metadata: Metadata = {
  title: `Projects - ${SITE_CONFIG.name}`,
  description: `Projects by ${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
}

export default function ProjectsPage() {
  return <ProjectsClient projects={projects} />
}
