import Hero from "./components/Hero"
import RecentPosts from "./components/RecentPosts"
import FeaturedProjects from "./components/FeaturedProjects"
import LatestPRs from "./components/LatestPRs"

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <Hero />
      <LatestPRs />
      <FeaturedProjects />
      <RecentPosts />
    </div>
  )
}
