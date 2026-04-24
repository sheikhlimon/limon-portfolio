import Hero from "./components/Hero"
import RecentPosts from "./components/RecentPosts"

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <Hero />
      <RecentPosts />
    </div>
  )
}
