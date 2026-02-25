**Personal portfolio, blog and engineering logs**

## Stack

- **Framework**: Next.js 16 (React 19, TypeScript)
- **Styling**: Tailwind CSS + next-themes
- **Content**: MDX, Shiki for code highlighting
- **Fonts**: Space Grotesk (sans), Fira Code (mono)

## Setup

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Structure

```
app/
├── components/     # React components
├── posts/          # Blog & logs page (/posts)
├── globals.css     # Global styles & CSS variables
└── layout.tsx      # Root layout + fonts

logs/               # Markdown files (blog posts, logs)
lib/                # Utilities & constants
public/             # Static assets
```

## Configuration

To make this your own, edit these files:

- `lib/constants.ts` — name, title, tagline, bio, social links, open source stats
- `app/layout.tsx` — metadata (title, description, keywords)
- `app/posts/page.tsx` — page metadata
- `package.json` — project name
- `public/favicon.svg` — your logo

## Adding Content

Posts go in `logs/` with frontmatter:
```yaml
---
title: 'Post Title'
date: DD MMM YYYY
type: blog  # or 'log'
---
```

## License

MIT
