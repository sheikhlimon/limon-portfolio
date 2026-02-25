import type { Metadata } from 'next'
import { Space_Grotesk, Fira_Code } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'
import SmoothScrollWrapper from '../components/SmoothScrollWrapper'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GoToTop from './components/GoToTop'

const sans = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const mono = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Sheikh Limon – Full-Stack Engineer, AI Infrastructure',
  description: 'Full-Stack Engineer building AI Infrastructure & Systems. Open Source Contributor.',
  keywords: [
    'Full-Stack Engineer',
    'AI Infrastructure',
    'Systems',
    'React',
    'Node.js',
    'TypeScript',
    'Open Source',
    'Portfolio',
    'Sheikh Limon',
    'sheikhlimon',
    'limon',
  ],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'format-detection': 'telephone=no, date=no, email=no, address=no',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body
        suppressHydrationWarning
        className="antialiased -bg-linear-0-to-br from-slate-50 to-slate-100 dark:from-black dark:via-zinc-950 dark:to-black text-gray-900 dark:text-white transition-colors duration-300 min-h-screen flex flex-col relative overflow-x-hidden font-sans"
      >
        {/* Starry background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Smaller stars */}
          {[...Array(40)].map((_, i) => {
            const positions = [
              { x: 10, y: 15 },
              { x: 25, y: 8 },
              { x: 40, y: 25 },
              { x: 60, y: 12 },
              { x: 75, y: 20 },
              { x: 90, y: 10 },
              { x: 15, y: 35 },
              { x: 30, y: 45 },
              { x: 55, y: 38 },
              { x: 80, y: 42 },
              { x: 5, y: 55 },
              { x: 20, y: 68 },
              { x: 45, y: 60 },
              { x: 70, y: 75 },
              { x: 85, y: 85 },
              { x: 12, y: 88 },
              { x: 35, y: 95 },
              { x: 65, y: 92 },
              { x: 88, y: 78 },
              { x: 28, y: 28 },
              { x: 52, y: 15 },
              { x: 78, y: 55 },
              { x: 8, y: 72 },
              { x: 42, y: 82 },
              { x: 68, y: 35 },
              { x: 92, y: 48 },
              { x: 18, y: 58 },
              { x: 38, y: 70 },
              { x: 58, y: 88 },
              { x: 82, y: 92 },
              { x: 22, y: 18 },
              { x: 48, y: 32 },
              { x: 72, y: 28 },
              { x: 95, y: 65 },
              { x: 32, y: 85 },
              { x: 62, y: 65 },
              { x: 87, y: 38 },
              { x: 25, y: 52 },
              { x: 50, y: 78 },
              { x: 77, y: 68 },
            ]
            const pos = positions[i % positions.length]
            return (
              <div
                key={`small-${i}`}
                className="absolute w-px h-px bg-zinc-400/50 dark:bg-white/40 rounded-full"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  opacity: 0.3 + (i % 3) * 0.15,
                  animation: `twinkle ${4 + (i % 4)}s ease-in-out ${i % 3}s infinite`,
                }}
              />
            )
          })}

          {/* Medium stars - fewer and dimmer */}
          {[...Array(10)].map((_, i) => {
            const positions = [
              { x: 20, y: 25 },
              { x: 50, y: 15 },
              { x: 80, y: 30 },
              { x: 15, y: 60 },
              { x: 70, y: 70 },
              { x: 35, y: 85 },
              { x: 90, y: 50 },
              { x: 10, y: 90 },
              { x: 60, y: 45 },
              { x: 85, y: 80 },
            ]
            const pos = positions[i % positions.length]
            return (
              <div
                key={`medium-${i}`}
                className="absolute bg-zinc-400/35 dark:bg-white/30 rounded-full"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: '2px',
                  height: '2px',
                  opacity: 0.2 + (i % 2) * 0.15,
                  animation: `twinkle ${5 + (i % 3)}s ease-in-out ${(i % 2) * 2}s infinite`,
                  boxShadow: '0 0 2px rgba(255, 255, 255, 0.1)',
                }}
              />
            )
          })}
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            color="#6b7280"
            initialPosition={0.08}
            crawl={false}
            height={2}
            showSpinner={false}
            shadow="0 0 10px rgba(107, 116, 128, 0.5)"
          />
          <SmoothScrollWrapper>
            <div className="flex flex-col min-h-screen overflow-x-hidden">
              <Navbar />
              <main className="max-w-3xl mx-auto px-5 py-10 grow w-full">{children}</main>
              <Footer />
            </div>
            <GoToTop />
          </SmoothScrollWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
