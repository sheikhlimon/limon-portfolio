import Hero from './components/Hero'
import RecentLogs from './components/RecentLogs'

export default function Home() {
  return (
    <div className="space-y-28">
      <Hero />
      <RecentLogs />
    </div>
  )
}
