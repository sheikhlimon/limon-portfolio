# AGENTS.md

## 1. Project Context & Architecture

- **Purpose:** Minimal, terminal-inspired developer portfolio and engineering logs for Sheikh Limon (Fedora apps maintainer & open-source contributor). Looks like a living, well-maintained README.
- **Stack & Commands:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, `next-themes`, Bun, `@phosphor-icons/react`, `shiki`, `oxlint`, `oxfmt`, `lefthook`.
  - `bun dev` (dev server on `localhost:3000`)
  - `bun run build` (production build)
  - `bunx oxlint && bunx tsc --noEmit` (fast pre-commit / pre-response verification)
- **Directory Map:**
  - `/app` — App Router routes: `/` (home), `/contributions` (full contribution dashboard), `/posts/[slug]` (markdown reader).
  - `/app/components` — Route components (`Hero.tsx`, `LatestPRs.tsx`, `ThemeToggle.tsx`, `CodeBlock.tsx`).
  - `/components` — Shell components (`FloatingControls.tsx`, `Footer.tsx`).
  - `/lib` — Data sources & utilities (`constants.ts`, `projects.ts`, `posts.ts`, `contributions.ts`).
  - `/logs` — Markdown log posts with YAML frontmatter.
- **Domain Terminology:**
  - _Fedora Forge / Pagure_: Fedora Project's Git forge (`forge.fedoraproject.org` / `src.fedoraproject.org`). Repos starting with `apps/` or `infra/` link to Fedora Forge, not GitHub.
  - _PR Stats_: PRs fetched from GitHub & Pagure APIs with memory caching and deduplication.
  - _Excluded Repos_: Configured in `lib/constants.ts` (`EXCLUDED_REPOS`). Short names (e.g. `infra-scope`) and case-insensitive matching must be supported.

## 2. Working Rules & Definition of Done

- **One Logical Unit:** One focused step per response, commit after each complete change.
- **Explain First:** Explain WHAT and WHY before writing or modifying code.
- **Fast Verification:** Do not run full TypeScript checks (`bunx tsc --noEmit`) on small, obvious styling or markup changes. Rely on fast `bunx oxlint` (or let pre-commit `lefthook` verify types). Only run `bunx tsc --noEmit` on architectural refactors, API changes, or complex data handling.
- **Definition of Done:** 0 lint errors, 0 type errors, clean responsive UI matching the terminal aesthetic, and accurate config in `lib/constants.ts`.

## 3. Strict Constraints (No Vibe-Coding)

- **RSC & Event Handlers:** Never pass event handlers (`onClick`, `onMouseEnter`) to Client Component props from Server Components (`LatestPRs.tsx` is an async RSC). Use native semantic `<a>` tags with `href` and `target="_blank"`.
- **Layout Sizing:** Home & post reading views must use `max-w-4xl mx-auto px-5 sm:px-8`. Contributions dashboard uses `max-w-[1440px] mx-auto px-5 sm:px-8`.
- **Typography & Font Roles:** Primary typeface across headings, titles, buttons, and prose is Space Grotesk (`font-sans`). CaskaydiaMono (`font-mono`) is reserved strictly for code blocks, inline code, repo identifiers, PR numbers, and the `## ` markdown prefix. Headings use lowercase with `## ` prefix.
- **Grayscale Palette with Git-Merged Mauve Accents:** Keep base text strictly grayscale (`text-gray-900`, `text-gray-400`, `dark:text-white`, `dark:text-gray-500`). Mauve hover (`hover:text-mauve transition-colors`, using Catppuccin Mauve `#8839ef` in light / `#cba6f7` in dark) is reserved strictly for Git PRs, issues, reviews, and project links. All navigation, bio links (`@sheikhlimon`), `reach me` social links, back links (`← home`), and section links (`view all`, `contributions →`) use neutral grayscale hover (`hover:text-gray-900 dark:hover:text-white` or `hover:text-gray-600 dark:hover:text-gray-300`). Status indicators follow git conventions (`text-mauve` merged, `text-green-600` open, `text-red-500` / `text-gray-400` closed).
- **External Links & Stats:** External links must use `rel="noopener noreferrer"`. "Merged by repo" lists must filter to repositories with `merged > 0`. On rows with hover actions, icons fade in on hover (`opacity-0 transition group-hover:opacity-100`).

## 4. The Anti-Pattern Graveyard

_(Avoid these past failures and generic AI habits)_

- **No HR Lines in README:** Do not add horizontal divider lines (`---` or `<hr>`) in README files.
- **No Cards:** Do not create boxed cards with shadows or borders. Use flat lists with dashed dividers (`border-b border-dashed border-gray-200 dark:border-gray-800/80`).
- **No Inconsistent Link Hovers:** Keep interactive text link hovers matching the git-merged mauve (`hover:text-mauve transition-colors`).
- **No Heavy Animations:** Subtle `transition-colors` only. No entrance motion, scale transforms, or floaty smooth-scroll lag.
- **No Underlined Default Links:** Avoid browser default link underlines on interactive list rows; use subtle hover color changes instead.
- **No Duplicate Shell Profiles:** Do not duplicate avatar/bio cards on subpages (e.g., `/contributions` has its own clean `## open source contributions` title).
- **No Emojis:** Do not add emojis to headings, badges, or copy unless explicitly requested by the user.

## 5. Git Hygiene

- Format: Conventional commits (`feat: ...`, `fix: ...`, `refactor: ...`, `docs: ...`).
- One logical unit per commit.
