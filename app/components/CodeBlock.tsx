"use client"

import { useEffect, useState } from "react"

interface CodeBlockProps {
  code: string
  language: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [highlighted, setHighlighted] = useState<string>("")

  useEffect(() => {
    async function highlight() {
      const { codeToHtml } = await import("shiki")
      const html = await codeToHtml(code, {
        lang: language as "bash" | "diff" | "rust" | "text" | "typescript" | "javascript",
        themes: {
          light: "catppuccin-latte",
          dark: "catppuccin-mocha",
        },
      })
      setHighlighted(html)
    }
    highlight()
  }, [code, language])

  if (!highlighted) {
    return (
      <div className="border border-dashed border-gray-200 dark:border-gray-800/80 rounded-xl my-6 overflow-hidden min-w-0 w-full max-w-full bg-gray-50 dark:bg-zinc-950/50">
        <pre className="font-mono text-sm whitespace-pre overflow-x-auto p-4 sm:p-5">
          <code className="text-gray-700 dark:text-gray-300">{code}</code>
        </pre>
      </div>
    )
  }

  return (
    <div
      className="border border-dashed border-gray-200 dark:border-gray-800/80 rounded-xl my-6 overflow-hidden min-w-0 w-full max-w-full bg-gray-50 dark:bg-zinc-950/50 [&>pre]:!m-0 [&>pre]:!p-5 [&>pre]:!bg-transparent"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  )
}
