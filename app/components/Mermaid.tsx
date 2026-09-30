"use client"
import React, { useEffect, useRef, useState } from "react"
import mermaid from "mermaid"
import { useTheme } from "next-themes"

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  flowchart: { htmlLabels: false },
  themeVariables: {
    fontFamily: "system-ui, sans-serif",
    primaryColor: "#f3f4f6", // gray-100
    primaryTextColor: "#111827", // gray-900
    primaryBorderColor: "#d1d5db", // gray-300
    lineColor: "#6b7280", // gray-500
    secondaryColor: "#e5e7eb", // gray-200
    tertiaryColor: "#f9fafb", // gray-50
    edgeLabelBackground: "#ffffff",
  },
})

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const [svg, setSvg] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true

    const renderChart = async () => {
      try {
        // Re-initialize theme based on the current dark/light mode
        const isDark = resolvedTheme === "dark"
        mermaid.initialize({
          startOnLoad: false,
          flowchart: { htmlLabels: false },
          theme: isDark ? "dark" : "base",
          themeVariables: isDark
            ? {
                fontFamily: "system-ui, sans-serif",
                primaryColor: "#18181b", // zinc-900
                primaryTextColor: "#f4f4f5", // zinc-50
                primaryBorderColor: "#3f3f46", // zinc-700
                lineColor: "#a1a1aa", // zinc-400
                secondaryColor: "#27272a", // zinc-800
                tertiaryColor: "#09090b", // zinc-950
                edgeLabelBackground: "#09090b",
              }
            : {
                fontFamily: "system-ui, sans-serif",
                primaryColor: "#f3f4f6", // gray-100
                primaryTextColor: "#111827", // gray-900
                primaryBorderColor: "#d1d5db", // gray-300
                lineColor: "#6b7280", // gray-500
                secondaryColor: "#e5e7eb", // gray-200
                tertiaryColor: "#f9fafb", // gray-50
                edgeLabelBackground: "#ffffff",
              },
        })

        // Generate a unique ID for the graph
        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`
        const { svg: renderedSvg } = await mermaid.render(id, chart)

        if (isMounted) {
          setSvg(renderedSvg)
          setError(false)
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to render Mermaid chart:", err)
          setError(true)
        }
      }
    }

    renderChart()

    return () => {
      isMounted = false
    }
  }, [chart, resolvedTheme])

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-md font-mono text-sm dark:bg-red-950/30 overflow-x-auto my-6 border border-dashed border-red-200 dark:border-red-900/50">
        Error rendering diagram
      </div>
    )
  }

  if (!svg) {
    return (
      <div className="animate-pulse bg-gray-100 dark:bg-zinc-900/50 h-48 rounded-lg my-6 border border-dashed border-gray-200 dark:border-gray-800/80"></div>
    )
  }

  return (
    <div
      ref={ref}
      className="mermaid-container flex justify-center my-8 overflow-x-auto border border-dashed border-gray-200 dark:border-gray-800/80 p-6 rounded-xl bg-white/50 dark:bg-zinc-950/50"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
