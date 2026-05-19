# Project: limon-portfolio

## Design Vibe

Clean, modern, minimalist developer portfolio with subtle sci-fi aesthetic. Less is more.

## Typography

- **Body font**: DM Sans (sans-serif — bio, project descriptions, resume body, blog prose)
- **Display font**: CaskaydiaMono Nerd Font (mono — nav, titles, headings, brand, logo, social links)
- **Code font**: CaskaydiaMono Nerd Font (code blocks and inline code)
- **Hierarchy**: `font-sans` (DM Sans) for body text, `font-display` (CaskaydiaMono) for headings/nav, `font-mono` for code
- **Brand name**: Two-tone styling — "Sheikh" (gray-400/500), "Limon" (gray-900/white)

## Colors (OKLCH - defined in globals.css)

Use CSS variables, not raw tailwind colors:

- `bg-background` / `text-foreground` (main colors)
- `text-gray-900 dark:text-white` (headings)
- `text-gray-700 dark:text-gray-300` (body)
- `text-gray-600 dark:text-gray-400` (muted/meta)
- Border: `border-gray-200 dark:border-gray-800` or `border-zinc-400/70 dark:border-zinc-500/50`

## Component Patterns

- **Container**: Each page handles its own width — `max-w-3xl mx-auto` for standard pages, `max-w-5xl mx-auto` for projects page. Layout provides no max-width.
- **Spacing**: `space-y-6`, `space-y-8`, `space-y-10`
- **Rounded**: `rounded` (0.625rem), `rounded-lg` (0.75rem)
- **Responsive**: Mobile-first → `sm:` breakpoint
- **Hover**: `hover:*` classes with `transition-colors`
- **Cards**: `border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg hover:shadow-lg`
- **Project cards**: `variant="featured"` (no tech stack, full description) vs `variant="default"` (with tech stack, line-clamped description)
- **Social link fonts**: Use `font-sans` (DM Sans), not `font-display`

## Mobile Responsiveness

- **Always** ensure mobile responsiveness - use `flex-col sm:flex-row` for stacked → side-by-side
- Markdown content: code blocks need `overflow-x-auto`, tables need proper overflow handling
- Test on mobile viewport for overflow issues
- Use `whitespace-nowrap` sparingly on long text
- Padding: `px-5` on mobile is safe, can increase on larger screens
- **Featured projects**: Horizontal scroll with snap on mobile (`overflow-x-auto snap-x snap-mandatory`), arrows for navigation, 3-column grid on `sm:`+

## Dark Mode

- Always include `dark:` variant for all color classes
- Theme via `next-themes` with system preference

## Interactions

- Subtle micro-interactions: `hover:scale-[1.02]`, `hover:-translate-y-1`
- Transitions: `transition-colors duration-200` or `duration-300`
- Focus: `outline-ring/50`
- **Image zoom**: Project card images use `scale-105` default with `group-hover:scale-100` and `overflow-hidden` on container — crops edges slightly at rest, settles on hover

## Code Style

- Client components: `'use client'` at top for interactivity
- Server components: default for static content
- Semantic HTML: `<nav>`, `<article>`, etc.
- **Icons**: Use `@phosphor-icons/react` package (e.g., `import { GithubLogo } from '@phosphor-icons/react'`)
- **Footer**: Social icons (GitHub, LinkedIn, Twitter) with SVG icons from SOCIAL_LINKS, centered above copyright

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

- All personal config lives in `lib/constants.ts` (SITE_CONFIG, BIO, SOCIAL_LINKS)
- Project data lives in `lib/projects.ts` — `Project` interface with `image?: string` for screenshots
- Project screenshots go in `public/` (e.g. `public/infra-scope.png`)
- When adding a new page, add its URL to `app/sitemap.ts`

## Build Commands

- `bun install` — install dependencies
- `bun dev` — dev server
- `bun run build` — production build

## Don't

- Don't add emojis (unless explicitly asked)
- Don't create new files unnecessarily — edit existing ones
- Don't over-engineer — keep it minimal
- Don't change navbar items without asking
- Don't add "generative AI" aesthetics — follow the established clean vibe
