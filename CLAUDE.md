@AGENTS.md

## Git Commit Style

Use conventional commit prefixes — one-liner, clear and concise:

```
add: short description
fix: what was fixed
update: what was updated
docs: changelog style description
refactor: what was refactored
```

## Comment Style

- One-liners only, only when logic isn't self-evident
- No docstrings or type annotations for obvious code

## Code Changes

- Edit existing files over creating new ones
- Follow existing patterns
- Don't add features beyond what was asked
- Match the established design vibe — no generic AI aesthetics

## Code Quality

- DRY — extract shared logic/constants/components
- Page files ~150 lines max, components ~200 lines
- Comments: only WHY, not WHAT

## When to Ask

- Before adding navbar items or changing design direction
- When multiple valid approaches exist or requirements are unclear

## Common Mistakes to Avoid

- Don't add hardcoded loader delays — use actual network events or remove
- Don't use `router.events` in Next.js App Router (use `usePathname`)
- Don't export `metadata` from `'use client'` components
- Don't add blur/backdrop/overlays to loaders unless asked
- Don't use indigo/purple — gray scale for sci-fi vibe
- Prefer `nextjs-toploader` over custom loaders for static sites
