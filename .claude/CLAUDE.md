# Project: limon-portfolio

## Design Vibe
Clean, modern, minimalist developer portfolio with subtle sci-fi aesthetic. Less is more.

## Typography
- **Sans-serif**: Space Grotesk (everything — body, headings, brand, code, logo)
- **Monospace**: Space Mono (small UI labels only — "Find me on", section titles)
- **Hierarchy**: `font-sans` for almost everything, `font-mono` for tiny accent labels
- **Brand name**: Two-tone styling — "Sheikh" (gray-400/500), "Limon" (gray-900/white)
- **Clean vibe**: Unified sans-serif aesthetic with minimal mono accents

## Colors (OKLCH - defined in globals.css)
Use CSS variables, not raw tailwind colors:
- `bg-background` / `text-foreground` (main colors)
- `text-gray-900 dark:text-white` (headings)
- `text-gray-700 dark:text-gray-300` (body)
- `text-gray-600 dark:text-gray-400` (muted/meta)
- Border: `border-gray-200 dark:border-gray-800` or `border-zinc-400/70 dark:border-zinc-500/50`

## Component Patterns
- **Container**: `max-w-3xl mx-auto px-5 py-10` (main), `max-w-4xl` (wider)
- **Spacing**: `space-y-6`, `space-y-8`, `space-y-10`
- **Rounded**: `rounded` (0.625rem), `rounded-lg` (0.75rem)
- **Responsive**: Mobile-first → `sm:` breakpoint
- **Hover**: `hover:*` classes with `transition-colors`
- **Cards**: `border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg hover:shadow-lg`

## Mobile Responsiveness
- **Always** ensure mobile responsiveness - use `flex-col sm:flex-row` for stacked → side-by-side
- Markdown content: code blocks need `overflow-x-auto`, tables need proper overflow handling
- Test on mobile viewport for overflow issues
- Use `whitespace-nowrap` sparingly on long text
- Padding: `px-5` on mobile is safe, can increase on larger screens

## Dark Mode
- Always include `dark:` variant for all color classes
- Theme via `next-themes` with system preference

## Interactions
- Subtle micro-interactions: `hover:scale-[1.02]`, `hover:-translate-y-1`
- Transitions: `transition-colors duration-200` or `duration-300`
- Focus: `outline-ring/50`

## Code Style
- Client components: `'use client'` at top for interactivity
- Server components: default for static content
- Semantic HTML: `<nav>`, `<article>`, etc.
- **Icons**: Use `lucide-react` package (e.g., `import { Github } from 'lucide-react'`)

## Don't
- Don't add emojis (unless explicitly asked)
- Don't create new files unnecessarily — edit existing ones
- Don't over-engineer — keep it minimal
- Don't change navbar items without asking
- Don't add "generative AI" aesthetics — follow the established clean vibe
