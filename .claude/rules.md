# Rules

## Before Any Action
1. Read `.claude/CLAUDE.md` for design patterns
2. Understand the existing code before suggesting changes

## Git Commit Style
**Commit after every proper feature or bug fix.** Use conventional commit prefixes:

```
add: short description
fix: what was fixed
update: what was updated
docs: changelog style description
refactor: what was refactored
```

Examples:
```
add: InfraScope project with Server icon, reorder projects, fix title styling
fix: remove unused eslint-disable
fix navbar active bold, footer hydration, logs title sizing
```

**Format:** One-liner only. Clear and concise.

## Comment Style
- **One-liners preferred**
- Only comment when logic isn't self-evident
- No docstrings or type annotations for simple/obvious code

## Code Changes
- Edit existing files instead of creating new ones when possible
- Follow existing patterns in the codebase
- Don't add features beyond what was asked
- Match the existing design vibe — no generic AI aesthetics

## When to Ask
- Before adding new navbar items
- Before changing the overall design direction
- When multiple valid approaches exist
- When requirements are unclear

## Code Quality
- **DRY Principle** - Don't repeat yourself. Extract shared logic/constants/components
- **File Size Limits** - Page files ~150 lines max, components ~200 lines. Extract when bloated
- **Comments** - Only comment WHY, not WHAT. No comments on self-explanatory code

## Common Mistakes to Avoid
- Don't add hardcoded loader delays — use actual network events or remove loader entirely
- Don't use `router.events` in Next.js App Router — it doesn't exist (use `usePathname` instead)
- Don't export `metadata` from `'use client'` components — it's server-only
- Don't add blur/backdrop to loaders unless asked — keep it minimal
- Don't make loaders too long (900ms/400ms) — static sites should feel instant
- Don't use indigo/purple colors unless matching existing design — use gray scale for shiki vibe
- Don't add background overlays to loaders — user wants to see page content
- Don't make loader elements too small — they should be visible and not blend with content
- For Next.js App Router static sites: prefer `nextjs-toploader` over custom overlay loaders
