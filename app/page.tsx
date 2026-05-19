import Hero from "./components/Hero"
import RecentPosts from "./components/RecentPosts"
import FeaturedProjects from "./components/FeaturedProjects"

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <Hero />
      <FeaturedProjects />
      <RecentPosts />
    </div>
  )
}
