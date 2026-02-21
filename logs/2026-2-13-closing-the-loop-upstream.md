---
title: 'Closing the Loop: The Lifecycle of a Patch from AUR to Upstream'
date: 13 Feb 2026
year: 2026
---

## The Realization

My initial fix worked in my local development environment, but the "real world" of packaging is different. When building from a clean tarball, the directory structure didn't match my local dev clone. My first PR ([#6917](https://github.com/block/goose/pull/6917)) had the source paths slightly off—a classic "it works on my machine" moment.

## The Iteration

I submitted a second, corrected PR ([#6978](https://github.com/block/goose/pull/6978)) to Goose. This time, I verified the paths against the actual release tarball structure, ensuring that the `@source` directives for Tailwind CSS v4 were robust enough for both developers and distributors.

## The Merge & Cleanup

The PR was reviewed and merged by the Goose team. This is the most important step for a maintainer: removing the technical debt.

Once the fix was upstream, I was able to:

- Update the AUR PKGBUILD to the latest version
- Delete the local `tailwind-fix.patch`
- Simplify the `source` array in the PKGBUILD

## Why This Matters

Local patches are "debt." They have to be maintained and re-applied every time the version bumps. By getting the fix merged upstream, I improved the software for every Linux user, not just those using my Arch package.

## Key Lesson

The goal of a package maintainer isn't just to keep the package working—it's to make the local patches unnecessary. Every downstream fix is an opportunity to improve the upstream project for everyone.
