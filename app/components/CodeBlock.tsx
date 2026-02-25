'use client'

import { useEffect, useState } from 'react'

interface CodeBlockProps {
  code: string
  language: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [highlighted, setHighlighted] = useState<string>('')

  useEffect(() => {
    async function highlight() {
      const { codeToHtml } = await import('shiki')
      const html = await codeToHtml(code, {
        lang: language as 'bash' | 'diff' | 'rust' | 'text' | 'typescript' | 'javascript',
        themes: {
          light: 'one-light',
          dark: 'one-dark-pro',
        },
      })
      setHighlighted(html)
    }
    highlight()
  }, [code, language])

  if (!highlighted) {
    return (
      <div className="border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg p-0 my-4 overflow-hidden min-w-0 w-full max-w-full bg-gray-50 dark:bg-gray-900">
        <pre className="font-mono text-sm whitespace-pre overflow-x-auto p-4"><code className="text-gray-700 dark:text-gray-300">{code}</code></pre>
      </div>
    )
  }

  return (
    <div
      className="border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg p-4 my-4 overflow-hidden min-w-0 w-full max-w-full bg-gray-50 dark:bg-gray-900"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  )
}
