**Personal portfolio, blog and engineering logs**

## Stack

- **Framework**: Next.js 16 (React 19, TypeScript)
- **Styling**: Tailwind CSS + next-themes
- **Content**: Markdown, Shiki for code highlighting
- **Linting & Hooks**: Oxlint, Oxfmt, Lefthook
- **Fonts**: DM Sans (body) + CaskaydiaMono Nerd Font (display/code)

## Setup

```bash
# Install dependencies
bun install

# Run dev server
bun dev

# Build for production
bun run build
```

## Structure

```
app/
├── components/     # React components
├── contributions/  # GitHub PRs data & components
├── posts/          # Blog & logs page (/posts)
├── globals.css     # Global styles & CSS variables
└── layout.tsx      # Root layout + fonts

logs/               # Markdown files (blog posts, logs)
lib/                # Project data & constants
public/             # Static assets
```

## Configuration

To make this your own, edit these files:

- `lib/constants.ts` — name, email, GitHub username, bio, social links, site metadata, contributions config (excluded repos)
- `lib/projects.ts` — your projects with GitHub/live URLs
- `.env.example` → `.env.local` — GitHub token for contributions API (optional)
- `package.json` — project name

## Adding Content

Posts go in `logs/` with frontmatter:

```yaml
---
title: "Post Title"
date: DD MMM YYYY
type: blog # or 'log'
---
```

## License

MIT
