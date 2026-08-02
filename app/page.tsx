import Hero from "./components/Hero"
import LatestPRs from "./components/LatestPRs"
import ProjectsClient from "./projects/projects-client"
import ResumeClient from "./resume/resume-client"
import BlogClient from "./posts/blog-client"
import { projects } from "../lib/projects"
import { getPosts } from "../lib/posts"

export default function Home() {
  const posts = getPosts()

  return (
    <div className="space-y-24 sm:space-y-32">
      <div id="about" className="scroll-mt-24">
        <Hero />
      </div>

      <div id="prs" className="scroll-mt-24">
        <LatestPRs />
      </div>

      <div id="projects" className="scroll-mt-24">
        <ProjectsClient projects={projects} />
      </div>

      <div id="resume" className="scroll-mt-24">
        <ResumeClient />
      </div>

      <div id="blog" className="scroll-mt-24">
        <BlogClient posts={posts} />
      </div>
    </div>
  )
}
