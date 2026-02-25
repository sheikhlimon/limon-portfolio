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
      const isDark = document.documentElement.classList.contains('dark')
      const html = await codeToHtml(code, {
        lang: language as 'bash' | 'diff' | 'rust' | 'text' | 'typescript' | 'javascript',
        theme: isDark ? 'github-dark' : 'github-light',
      })
      setHighlighted(html)
    }
    highlight()
  }, [code, language])

  if (!highlighted) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 my-4 overflow-x-auto min-w-0 w-full max-w-full">
        <pre className="font-mono text-sm whitespace-pre overflow-x-auto"><code>{code}</code></pre>
      </div>
    )
  }

  return (
    <div
      className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 my-4 overflow-x-auto min-w-0 w-full max-w-full"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  )
}
