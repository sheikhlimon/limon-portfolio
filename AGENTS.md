# AGENTS.md

## 1. Project Context & Architecture

- **Purpose:** Developer portfolio, engineering logs, and open-source contribution tracker.
- **Stack & Commands:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Bun, `oxlint`, `oxfmt`, `lefthook`.
  - `bun dev` (dev server on `localhost:3000`)
  - `bun run build` (production build)
  - `bunx oxlint` (fast pre-commit / pre-response verification)
- **Directory Map:**
  - `/app` — App Router routes: `/` (home), `/contributions` (dashboard), `/posts/[slug]` (reader).
  - `/app/components` — Route components (`Hero.tsx`, `RecentActivity.tsx`, `ThemeToggle.tsx`, `CodeBlock.tsx`).
  - `/components` — Shell components (`FloatingControls.tsx`, `Footer.tsx`).
  - `/lib` — Data sources & fetchers (`constants.ts`, `projects.ts`, `posts.ts`, `contributions.ts`).
  - `/logs` — Markdown log posts with YAML frontmatter.
- **Domain Terminology:**
  - _Fedora Forge / Pagure_: Repos starting with `apps/` or `infra/` link to Fedora Forge (`forge.fedoraproject.org`), not GitHub.
  - _Excluded Repos_: Configured in `lib/constants.ts` (`EXCLUDED_REPOS`). Short names (e.g. `infra-scope`) and case-insensitive matching must be supported.

## 2. Working Rules & Definition of Done

- **One Logical Unit:** One focused step per response, commit after each complete change.
- **Explain First:** Explain WHAT and WHY before writing or modifying code.
- **Fast Verification:** Rely on fast `bunx oxlint`. Only run `bunx tsc --noEmit` on architectural refactors, API changes, or complex data handling.
- **Definition of Done:** 0 lint errors, 0 type errors, clean responsive UI matching the minimal document aesthetic, and accurate config in `lib/constants.ts`.

## 3. Design Guidelines

- **Layout & Structure:** Document-first layout using flat lists with dashed dividers (`border-b border-dashed border-gray-200 dark:border-gray-800/80`) on home and post reader. Zero drop shadows. Multi-column dashboard (`/contributions`) uses dashed-border panels (`rounded-xl border border-dashed border-gray-200 dark:border-gray-800/80 bg-white dark:bg-zinc-950`) to contain dense interactive feeds.
- **Sizing:** Home & post reader use `max-w-4xl mx-auto px-5 sm:px-8`. Contributions dashboard uses `max-w-[1440px] mx-auto px-5 sm:px-8`.
- **Typography:** Space Grotesk (`font-sans`) for prose, headings (lowercase with `## ` prefix), titles, and buttons. CaskaydiaMono (`font-mono`) strictly for code blocks, inline code, repo identifiers, PR numbers, and markdown syntax.
- **Palette & Git Mauve Accents:** Strictly grayscale base (`text-gray-900`, `dark:text-white`, muted `text-gray-500`). Catppuccin Mauve hover (`hover:text-mauve transition-colors`, `#8839ef` light / `#cba6f7` dark) reserved strictly for Git PRs, issues, reviews, and project links. Navigation, bio, and back links use neutral grayscale hover. Status colors: git-merged `text-mauve`, open `text-green-600`, closed `text-red-500` / `text-gray-400`.
- **Motion & Interaction:** Snappy `transition-colors` only. Zero entrance animations, scale transforms, or viewport scroll-snapping. On list rows with hover actions, icons fade in on hover (`opacity-0 transition group-hover:opacity-100`).

## 4. Technical Constraints

- **RSC & Event Handlers:** Never pass event handlers (`onClick`, `onMouseEnter`) to Client Component props from Server Components (`RecentActivity.tsx` / `LatestPRs.tsx`). Use native semantic `<a>` tags with `href` and `target="_blank"`.
- **External Links & Stats:** External links must use `rel="noopener noreferrer"`. "Merged by repo" lists must filter to repositories with `merged > 0`.

## 5. The Anti-Pattern Graveyard

_(Avoid these past failures and generic AI habits)_

- **No HR Lines in README:** Do not add horizontal divider lines (`---` or `<hr>`) in README files.
- **No Cards on Document Views:** Do not create boxed cards or shadows on reading pages (home & posts). Use flat lists with dashed dividers. Dashboard panels on `/contributions` are the only exception.
- **No Scroll Snapping or Viewport Locking:** Do not enforce `snap-y`, `snap-start`, or artificial `min-h-[100svh]`. Flow naturally with consistent section spacing (`space-y-12 sm:space-y-14`).
- **No Inconsistent Link Hovers:** Keep interactive text link hovers matching the git-merged mauve (`hover:text-mauve transition-colors`).
- **No Heavy Animations:** Subtle `transition-colors` only.
- **No Underlined Default Links:** Avoid browser default link underlines on interactive list rows.
- **No Duplicate Shell Profiles:** Do not duplicate avatar/bio cards on subpages.
- **No Emojis:** Do not add emojis to headings, badges, or copy unless explicitly requested by the user.

## 6. Git Hygiene

- Format: Conventional commits (`feat: ...`, `fix: ...`, `refactor: ...`, `docs: ...`).
- One logical unit per commit.
