import Hero from './components/Hero'
import TechStack from './components/TechStack'
import OSS from './components/OSS'

export default function Home() {
  return (
    <div className="space-y-28">
      <Hero />
      <TechStack />
      <OSS />
    </div>
  )
}
