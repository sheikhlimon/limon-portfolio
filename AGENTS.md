# Project: limon-portfolio

## Design Vibe

Minimal, terminal-inspired single-page portfolio. Looks like a well-maintained README. Linux/open-source engineer aesthetic — not flashy "modern", just clean and honest.

## Typography

- **Body font**: DM Sans (sans-serif — bio paragraphs, project descriptions, blog prose)
- **Display font**: CaskaydiaMono Nerd Font (mono — headings, section labels, links, email, social)
- **Code font**: CaskaydiaMono Nerd Font (code blocks and inline code)
- **Hierarchy**: `font-sans` (DM Sans) for body text, `font-display` (CaskaydiaMono) for headings/labels, `font-mono` for code
- **Brand name**: Two-tone styling — "Sheikh" (gray-400/500), "Limon" (gray-900/white)

## Colors

Mostly grayscale. Only color comes from PR status indicators:

- `text-purple-500 dark:text-purple-400` (merged PRs)
- `text-green-600 dark:text-green-400` (open PRs)
- Headings: `text-gray-900 dark:text-white`
- Body: `text-gray-700 dark:text-gray-300`
- Muted/labels: `text-gray-400 dark:text-gray-500`
- Very muted: `text-gray-300 dark:text-gray-700` (## prefix in headings)
- Borders: dashed `border-gray-200 dark:border-gray-800/80` or `border-gray-300 dark:border-gray-800`

## Page Structure (Single Page)

One page, top to bottom:

1. **Hero** — name, subtitle ("open source engineer"), conversational bio, email, social links
2. **Latest PRs** — 10 most recent, fetched from GitHub API
3. **Projects** — clean list with description + tech stack
4. **Writing** — blog posts list with dates
5. **Footer** — inline in layout, just copyright

Sections separated by dashed dividers (`.section-divider`).

## Section Headings

Use `.section-heading` class with `## ` prefix:

```tsx
<h2 className="section-heading text-gray-500 dark:text-gray-400">
  <span className="text-gray-300 dark:text-gray-700">## </span>latest prs
</h2>
```

Always lowercase. Always monospace.

## Layout

- **No navbar** — removed entirely
- **Floating controls**: GitHub icon + theme toggle, fixed top-right (`fixed top-5 right-5 z-50`)
- **Container**: `max-w-2xl mx-auto px-5` in layout
- **Spacing**: `space-y-16 sm:space-y-20` between sections

## Component Patterns

- **No cards** — everything is flat lists with dashed border-bottom dividers
- **No framer-motion animations** — just `transition-colors` on hover
- **No images** — projects are text-only
- **Links**: lowercase monospace text, `hover:text-gray-900 dark:hover:text-white transition-colors`
- **PR items**: icon + title + repo/number + date, dashed divider between items
- **Project items**: title + live/source links + description + tech stack (lowercase)
- **Writing items**: title + date/reading time, link to `/posts/[slug]`

## Mobile Responsiveness

- **Always** mobile-first — `flex-col sm:flex-row` for stacked → side-by-side
- PR list items stack on mobile, inline on desktop
- Code blocks need `overflow-x-auto`
- Padding: `px-5` on mobile

## Dark Mode

- Always include `dark:` variant for all color classes
- Theme via `next-themes` with system preference
- Background: `bg-white dark:bg-zinc-950`

## Interactions

- **Minimal** — no entrance animations, no scale transforms
- Hover: `transition-colors` only, text color shifts
- Email: click to copy with "copied!" feedback
- Links: underline on hover (`group-hover:underline`)

## Code Style

- Client components: `'use client'` at top for interactivity
- Server components: default for static content
- Semantic HTML: `<section>`, `<article>`, etc.
- **Icons**: Use `@phosphor-icons/react` (e.g., `import { GitMerge } from '@phosphor-icons/react'`)

## Blog / Log Posts

- **Location**: `logs/` directory as `.md` files
- **Naming**: `YYYY-M-D-slug.md` (e.g. `2026-5-8-my-post.md`)
- **Frontmatter**:
  ```yaml
  ---
  title: "Post Title"
  date: 8 May 2026
  year: 2026
  type: blog
  tags: ["one-tag"]
  ---
  ```
- `type` is either `blog` or `log`
- `tags` is a single-item array — one tag per post
- For external posts, add `externalUrl: "https://..."`
- Content is plain Markdown (no MDX)
- Posts are auto-sorted by date, reading time is auto-calculated

## Configuration

- All personal config lives in `lib/constants.ts` (SITE_CONFIG, SOCIAL_LINKS)
- Project data lives in `lib/projects.ts`
- Post data helper in `lib/posts.ts`
- When adding a new page, add its URL to `app/sitemap.ts`

## Build Commands

- `bun install` — install dependencies
- `bun dev` — dev server
- `bun run build` — production build

## Don't

- Don't add emojis (unless explicitly asked)
- Don't create new files unnecessarily — edit existing ones
- Don't over-engineer — keep it minimal
- Don't add navbar back
- Don't add resume section
- Don't add cards or image thumbnails
- Don't add framer-motion animations
- Don't add "generative AI" aesthetics
