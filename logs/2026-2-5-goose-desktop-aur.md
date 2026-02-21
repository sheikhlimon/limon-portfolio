---
title: 'Arch Package Maintenance: Debugging Broken CSS in Tarball Builds'
date: 5 Feb 2026
year: 2026
---

## Project Context

[Goose](https://github.com/block/goose) is an open-source AI agent. As the maintainer of the **[goose-desktop](https://aur.archlinux.org/packages/goose-desktop)** package on the AUR, I am responsible for ensuring the build is stable across different Arch environments.

## The Problem

A user reported that building the package from the GitHub release tarballs resulted in a completely broken UI. The application would launch, but the CSS was missing, making it unusable.

### Symptoms:

- **Git Clone Build:** CSS renders correctly ✅
- **Tarball Build:** UI is unstyled/broken ❌

## Root Cause Analysis

Modern build tools often try to be "smart" by detecting the environment. I discovered that **Tailwind CSS v4's Vite plugin** attempts to detect the `.git` directory to resolve file paths.

When building from an AUR tarball (which contains no `.git` metadata), the auto-discovery fails silently. The build completes, but the CSS bundle is effectively empty.

## The Fix: Downstream Patching

To resolve this, I created a patch to bypass the auto-discovery. By adding explicit `@source` directives, we tell Tailwind exactly where the files are located regardless of whether it's inside a Git repository.

### `tailwind-fix.patch`

```diff
@source '../../index.html';
@source '../**/*.{js,ts,jsx,tsx}';
```

In the PKGBUILD, I implemented the fix within the `prepare()` function to ensure it is applied before the build starts:

```bash
prepare() {
  cd "goose-${pkgver}"
  # Apply the fix for Tailwind CSS v4 discovery issue
  patch -p1 -i "${srcdir}/tailwind-fix.patch"
}
```

## Contributing Upstream

Following the "Code over Credentials" philosophy, I didn't just keep the fix in the AUR. I submitted the patch as a Pull Request to the official Goose repository.

While waiting for the upstream merge, the AUR package maintains this local patch to ensure a working experience for all Linux users.

## Lessons Learned

1. **Environment Sensitivity:** Modern tooling behaves differently in dev vs. production. Always test builds outside of a Git-cloned environment.

2. **Packaging as Debugging:** The process of packaging software often reveals edge-case bugs that standard CI/CD might miss.

3. **Upstream First:** Always share fixes. Downstream patches should be temporary; upstream stability is the ultimate goal.
