# Sheikh Limon — Portfolio

Personal portfolio, engineering logs, and open-source contribution tracker.

## Stack

- **Framework**: Next.js 16 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS v4 + `next-themes`
- **Content & Syntax**: Markdown, Shiki syntax highlighting
- **Icons**: Phosphor Icons (`@phosphor-icons/react`)
- **Linting & Formatting**: Oxlint, Oxfmt, Lefthook
- **Typography**: Space Grotesk (body & headings) + CaskaydiaMono Nerd Font (code & mono accents)

## Setup & Commands

```bash
# Install dependencies
bun install

# Run dev server (localhost:3000)
bun dev

# Lint & type check
bun run lint
bun run typecheck

# Build for production
bun run build
```

## Structure

```
app/
├── components/     # Route components (Hero, LatestPRs, ThemeToggle, CodeBlock)
├── contributions/  # Open-source contributions dashboard & metrics
├── posts/[slug]/   # Blog post reader & markdown renderer
├── globals.css     # Tailwind v4 theme, font variables & prose styles
├── layout.tsx      # Root layout & theme provider
└── page.tsx        # Portfolio home page

components/         # Global shared components (FloatingControls, Footer)
lib/                # Projects, blog parser, constants & contribution fetchers
logs/               # Markdown engineering posts & log entries
public/             # Font files & static icons
```

## Configuration

To customize the portfolio:

- `lib/constants.ts` — Name, email, GitHub username, bio, social links, and contribution filters (`EXCLUDED_REPOS`).
- `lib/projects.ts` — Projects list with live demo and source code URLs.
- `lib/contributions.ts` — GitHub & Fedora Forge / Pagure PR and issue fetchers.
- `.env.example` → `.env.local` — Optional `GITHUB_TOKEN` (increases rate limits) and `FEDORA_FORGE_TOKEN` (enables global repository search).
- `logs/` — Add markdown posts with YAML frontmatter:

```yaml
---
title: "Post Title"
date: "2026-03-15"
type: "blog" # or 'log'
---
```

## License

MIT
