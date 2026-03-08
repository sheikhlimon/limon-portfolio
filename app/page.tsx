import Hero from './components/Hero'
import RecentPosts from './components/RecentPosts'

export default function Home() {
  return (
    <div className="space-y-28">
      <Hero />
      <RecentPosts />
    </div>
  )
}
