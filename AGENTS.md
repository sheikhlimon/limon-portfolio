# AGENTS.md

## 1. Project Context

- **Purpose:** Developer portfolio, logs, and open-source contribution tracker.
- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
- **Commands:** `bunx oxlint` (fast verification), `bunx tsc --noEmit`.
- **Directories:** `/app` (routes), `/components` (UI), `/lib` (data/fetchers), `/logs` (markdown).
- **Fedora Forge:** Repos starting with `apps/` or `infra/` link to `forge.fedoraproject.org`.
- **Diagrams:** Use D2 (` ```d2 `) rendered via Kroki (`D2Diagram.tsx`).

## 2. Design System & Constraints

- **Layout:** Flat lists with dashed dividers (`border-dashed border-gray-200 dark:border-gray-800/80`). Zero drop shadows. No boxed cards outside of dashboard panels.
- **Typography:** Space Grotesk (`font-sans`) for prose/headings. CaskaydiaMono (`font-mono`) for code, identifiers, and syntax. Headings use lowercase with `## ` prefix.
- **Palette:** Grayscale base. Catppuccin Mauve hover (`hover:text-mauve`) reserved strictly for Git PRs, issues, and project links.
- **Motion:** Snappy `transition-colors` only. No heavy entrance animations or viewport scroll-snapping.
- **Client/Server:** Never pass event handlers from Server to Client Components. Use native `<a>` for external links (`rel="noopener noreferrer"`).

## 3. Workflow & Definition of Done

- **One Logical Unit:** One focused step per response, commit after each complete change.
- **Explain First:** Explain WHAT and WHY before writing code.
- **Git Hygiene:** Conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`).
- **Verification:** 0 lint errors (`oxlint`), clean responsive UI, accurate config.

## 4. The Anti-Pattern Graveyard

- **No HR Lines in README.**
- **No Cards on Document Views.** Use flat dashed lists.
- **No Scroll Snapping.** Flow naturally.
- **No Underlined Default Links.**
- **No Duplicate Shell Profiles.**
- **No Mermaid Diagrams.** Use D2 instead (avoids Dagre font bounding-box and text-clipping bugs).
- **No Emojis.** (Unless explicitly requested).
