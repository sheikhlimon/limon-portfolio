---
title: 'Automating AUR Maintenance: From Manual Chores to One Command'
date: 3 Feb 2026
year: 2026
---

## Project Context

I recently took over as maintainer for the **[goose-desktop](https://aur.archlinux.org/packages/goose-desktop)** AUR package. Goose is an open-source AI agent. The package needed proper tarball builds with checksums following Arch best practices.

## The Manual Pain

Maintaining an AUR package means staying on top of upstream releases. For every new version:

```bash
# 1. Check GitHub for new release
# 2. Update pkgver in PKGBUILD
# 3. Reset pkgrel to 1
# 4. Download tarball to generate checksum
# 5. Update b2sums in PKGBUILD
# 6. Generate .SRCINFO
# 7. Verify build with makepkg -od
# 8. Commit and push
```

Do this often enough, and it becomes tedious. Do it for multiple packages, and it's soul-crushing.

## The Script

I wrote `update-goose-pkgbuild.sh` to handle all of this:

```bash
#!/usr/bin/env bash
set -euo pipefail

REPO="block/goose"

# Fetch latest version from GitHub API
RELEASE_DATA=$(curl -s "https://api.github.com/repos/${REPO}/releases/latest")
LATEST_VERSION=$(echo "$RELEASE_DATA" | jq -r '.tag_name' | sed 's/^v//')

CURRENT_VERSION=$(grep '^pkgver=' PKGBUILD | cut -d'=' -f2)

if [[ "$LATEST_VERSION" == "$CURRENT_VERSION" ]]; then
    echo "Already up to date!"
    exit 0
fi

# Update PKGBUILD
sed -i "s/^pkgver=.*/pkgver=${LATEST_VERSION}/" PKGBUILD
sed -i "s/^pkgrel=.*/pkgrel=1/" PKGBUILD

# Generate checksum for tarball only (preserve patch checksum)
TARBALL_URL="https://github.com/${REPO}/archive/refs/tags/v${LATEST_VERSION}.tar.gz"
B2SUM=$(curl -L "$TARBALL_URL" | b2sum | awk '{print $1}')
sed -i "0s/b2sums=('.*'/b2sums=('${B2SUM}'/" PKGBUILD

# Update .SRCINFO
makepkg --printsrcinfo >| .SRCINFO

# Verify tarball downloads
makepkg -od
```

Now: one command, done in seconds.

## Edge Cases Hit

### zsh NO_CLOBBER

Initially used `>` for redirecting `.SRCINFO`. Zsh's `NO_CLOBBER` option blocked overwrites:

```
zsh: file exists: .SRCINFO
```

Fixed with `>|` to force overwrite:

```bash
makepkg --printsrcinfo >| .SRCINFO
```

### npm Lock File Mismatches

Upstream tarballs sometimes have stale `package-lock.json` files. `npm ci` fails when lock file is out of sync with `package.json`:

```
npm error Missing: encoding@0.1.13 from lock file
npm error Missing: iconv-lite@0.6.3 from lock file
```

Solution: use `npm install` instead of `npm ci`—it regenerates the lock file as needed.

## The Payoff

Automation reduces friction. Lower friction means faster updates for users. Faster updates mean fewer people running outdated software.

The script isn't fancy—it's just bash. But it turns a 5-minute multi-step process into a single command that just works.
