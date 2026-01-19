import Hero from './components/Hero'
import OSS from './components/OSS'
import Projects from './components/Projects'
import RecentLogs from './components/RecentLogs'

export default function Home() {
  return (
    <div className="space-y-28">
      <Hero />
      <RecentLogs />
      <OSS />
      <Projects />
    </div>
  )
}
