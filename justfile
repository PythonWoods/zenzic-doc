# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0

# just - Obsidian Enterprise workflow for zenzic-doc
set shell := ["bash", "-c"]
# ZRT-010 — Sovereign Parity: _zenzic_core/ mirrors CI CORE_REF checkout.
# Override with ZENZIC_PROJECT_PATH for ad-hoc testing against other core paths.
zenzic_project := env_var_or_default("ZENZIC_PROJECT_PATH", "_zenzic_core")

# Use `just --list` to see available commands

# --- SETUP & MAINTENANCE ---

# Install locked dependencies deterministically
setup:
    npm ci

# Clone or update the local zenzic core into _zenzic_core/ (mirrors CI CORE_REF branch logic).
# Run once before the first 'just verify'; re-run after branch switches.
setup-core:
    #!/usr/bin/env bash
    set -euo pipefail
    BRANCH=$(git branch --show-current)
    REMOTE="https://github.com/PythonWoods/zenzic.git"
    echo "Resolving core branch for: ${BRANCH}"
    if git ls-remote --exit-code --heads "${REMOTE}" "${BRANCH}" > /dev/null 2>&1; then
        CORE_BRANCH="${BRANCH}"
    else
        echo "Branch '${BRANCH}' not found in core — falling back to main"
        CORE_BRANCH="main"
    fi
    if [ -d "_zenzic_core/.git" ]; then
        echo "Updating _zenzic_core (→ ${CORE_BRANCH})..."
        git -C _zenzic_core fetch --depth=1 origin "${CORE_BRANCH}"
        git -C _zenzic_core checkout "${CORE_BRANCH}"
        git -C _zenzic_core reset --hard "origin/${CORE_BRANCH}"
    else
        echo "Cloning zenzic core (→ ${CORE_BRANCH})..."
        git clone --depth=1 --branch "${CORE_BRANCH}" "${REMOTE}" _zenzic_core
    fi
    echo "Core ready: $(git -C _zenzic_core log --oneline -1)"

# Clean generated artifacts
clean:
    rm -rf build .docusaurus

# Deep clean: remove artifacts and node_modules (preserves package-lock.json for reproducible npm ci)
clean-all: clean
    rm -rf node_modules

# Remove the local zenzic core cache (re-run 'just setup-core' to restore)
clean-core:
    rm -rf _zenzic_core
    @echo "_zenzic_core removed."

# Purge Docusaurus and npm cache to resolve ghost build issues
purge-cache:
    npm cache clean --force
    rm -rf .docusaurus
    @echo "Cache purged. Run 'just build' for a fresh start."

# --- DEVELOPMENT ---

# Start local development server (single-locale; locale dropdown inactive in dev mode)
# Use 'just preview' to test the locale switcher in a full production environment
start:
    npm run start

# Start local development server in Italian (single-locale dev mode)
start-it:
    npm run start:it

# Serve production build locally (EN + IT, language switcher active)
serve:
    npm run serve

# Build then serve production site locally (full EN+IT testbed — recommended for locale switcher testing)
preview: build
    npm run serve

# --- QUALITY GATES ---

# Build production static site — Sentinel Gate: Zenzic must pass before Docusaurus builds
build: sentinel
    npm run build

# Run the Zenzic Sentinel quality check only (faster than full preflight).
# ZRT-010: delegates to 'just check' — single source of truth for the guard.
# Pass extra flags directly: just sentinel --no-external
sentinel *args:
    just check {{args}}

# Run all pre-commit hooks against every tracked file (mirrors CI gate exactly)
preflight:
    uvx pre-commit run --all-files

# Explicit Zenzic audit gate (ZRT-010 — Sovereign Parity).
# Pre-Launch Guard is inlined: local == CI. No env var required.
# Pass extra flags directly: just check --no-external
check *args:
    #!/usr/bin/env bash
    set -euo pipefail
    # Pre-Launch Guard — remove after GA deploy when all URLs resolve
    GUARD=(
      --exclude-url "https://zenzic.dev/blog/"
      --exclude-url "https://zenzic.dev/docs/explanation/structural-integrity"
      --exclude-url "https://zenzic.dev/developers/"
      --exclude-url "https://zenzic.dev/it/developers/"
      --exclude-url "https://github.com/PythonWoods/zenzic/releases/tag/v0.7.0"
    )
    uv run --project "{{zenzic_project}}" zenzic check all --strict "${GUARD[@]}" {{args}}

# Static type check
typecheck:
    npm run typecheck

# Lint TypeScript/React source files (excluding intentional landing monolith)
lint:
    npm run lint:ts

# Lint Markdown and MDX files
markdownlint:
    npm run lint:md

# Test suite (docs integration checks via nox)
test:
    uvx nox -s tests

# Enterprise local gate (4-Gates Standard)
verify: check preflight test

# --- PROJECT ADMIN ---

# Check REUSE/SPDX licence compliance
reuse:
    uvx reuse lint

# Bump all hardcoded Zenzic version references
# Usage:  just bump 0.6.3
#         just bump 0.6.3 'v0.6.3 "Obsidian Flux" Stable'
bump version badge='':
    @bash scripts/bump-version.sh "{{version}}" "{{badge}}"

# Check developer environment health (node, npm, uv, zenzic)
doctor:
    @node -v || echo "node missing"
    @npm -v || echo "npm missing"
    @uv --version || echo "uv missing"
    @uvx zenzic --version 2>/dev/null || echo "zenzic not cached (first run: uvx zenzic --version)"
