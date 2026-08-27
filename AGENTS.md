# limon-portfolio

Minimal, terminal-inspired single-page portfolio for Sheikh Limon (Open Source Developer). Looks like a well-maintained README with open-source PRs, projects, and log posts.

## Tech Stack & Commands

- **Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Next Themes, Bun
- **Icons**: `@phosphor-icons/react`
- **Commands**: `bun dev` (dev server), `bun run build` (production build), `bun install`
- **Tooling**: Lefthook (`oxlint`, `oxfmt`, `tsc --noEmit`)

## Working Rules

- **EXPLAIN FIRST**: Explain WHAT and WHY before writing code
- **ONE LOGICAL UNIT**: Work in focused steps, commit after each complete change
- **GIT COMMITS**: Conventional commit format (`feat: ...`, `fix: ...`, `refactor: ...`)
- **DRY**: Use `lib/constants.ts` for config, `lib/projects.ts` for projects, `lib/posts.ts` for posts

## Design Vibe & Typography

- **Vibe**: Clean terminal / README Linux developer aesthetic (mostly grayscale)
- **Typography**: DM Sans (`font-sans` for body), CaskaydiaMono (`font-display` / `font-mono` for headings & code)
- **Brand**: Two-tone "Sheikh" (muted gray) "Limon" (gray-900/white)
- **Headings**: Monospace lowercase with `## ` prefix (`<h2 className="section-heading text-gray-500 dark:text-gray-400"><span className="text-gray-300 dark:text-gray-700">## </span>section</h2>`)
- **Layout**: Single-page (`max-w-2xl mx-auto px-5`), floating top-right controls (`absolute sm:fixed top-5 right-5 z-50`), no navbar

## Anti-Patterns (Avoid)

- **No cards**: Use flat lists with dashed dividers (`border-b border-dashed border-gray-200 dark:border-gray-800/80`)
- **No heavy animations**: Use subtle `transition-colors` only (no entrance animations or scale transforms)
- **No arbitrary colors**: Grayscale base with status colors only (`text-purple-500` merged PRs, `text-green-600` open PRs)
- **No unnecessary files**: Edit existing files over creating new ones; no emojis unless requested
