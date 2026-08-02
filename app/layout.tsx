import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { SITE_CONFIG } from "../lib/constants"
import { ThemeProvider } from "next-themes"
import FloatingControls from "../components/FloatingControls"

const caskaydia = localFont({
  src: [
    { path: "../public/fonts/CaskaydiaMonoNerdFont-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/CaskaydiaMonoNerdFont-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-caskaydia",
})

const dmSans = localFont({
  src: [
    { path: "../public/fonts/DMSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/DMSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/DMSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/DMSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: SITE_CONFIG.siteTitle,
  description: SITE_CONFIG.siteDescription,
  keywords: SITE_CONFIG.siteKeywords,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "format-detection": "telephone=no, date=no, email=no, address=no",
  },
  verification: {
    google: "86ieBIS8IJChm-PeOEiavOA3EVJHei89AybHeVR0shQ",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={SITE_CONFIG.lang} suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className={`${caskaydia.variable} ${dmSans.variable} antialiased bg-white dark:bg-zinc-950 text-gray-900 dark:text-white transition-colors duration-300 min-h-screen flex flex-col relative overflow-x-hidden font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FloatingControls />

          <main className="max-w-2xl mx-auto px-5 pt-12 sm:pt-20 pb-16 grow w-full">
            {children}
          </main>

          <footer className="max-w-2xl mx-auto px-5 pb-8 w-full">
            <div className="border-t border-dashed border-gray-300 dark:border-gray-800 pt-6">
              <p className="text-sm font-display text-gray-400 dark:text-gray-600">
                2025-PRESENT &copy; Sheikh Limon
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
