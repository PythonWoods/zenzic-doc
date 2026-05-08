# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0

# just - Quartz Enterprise workflow for zenzic-doc
set shell :=["bash", "-c"]

# Use `just --list` to see available commands

# --- SETUP & MAINTENANCE ---

# Install locked dependencies deterministically
setup:
    npm ci

# Clean generated artifacts
clean:
    rm -rf build .docusaurus

# Deep clean: remove artifacts and node_modules
clean-all: clean
    rm -rf node_modules

# Purge Docusaurus and npm cache to resolve ghost build issues
purge-cache:
    npm cache clean --force
    rm -rf .docusaurus
    @echo "Cache purged. Run 'just build' for a fresh start."

# --- DEVELOPMENT ---

# Start local development server (single-locale; locale dropdown inactive in dev mode)
start:
    npm run start

# Start local development server in Italian
start-it:
    npm run start:it

# Serve production build locally (EN + IT, language switcher active)
serve:
    npm run serve

# Build then serve production site locally (full EN+IT testbed)
preview: build
    npm run serve

# --- QUALITY GATES ---

# Fast local checks (pre-commit on staged files)
lint *args:
    uvx pre-commit run {{args}}

# Recommended final local check (4-Gates Standard: pre-commit + build + codes parity)
verify: _check-hooks lint-all build verify-codes

# Verify Zxxx code parity between codes.py and finding-codes.mdx (EN + IT)
verify-codes:
    uvx nox -s verify-codes-parity

# --- INTERNAL RECIPES (Hidden from 'just --list') ---

lint-all:
    uvx pre-commit run --all-files

build:
    npm run build

check *args:
    #!/usr/bin/env bash
    set -euo pipefail
    # Permanent exclusion: contributor-covenant.org is a flaky third-party URL.
    GUARD=(
      --exclude-url "https://www.contributor-covenant.org/version/2/1/code_of_conduct.html"
    )
    CORE_PATH="${ZENZIC_PROJECT_PATH:-../zenzic}"

    if [ -d "$CORE_PATH" ]; then
        echo "🛡️  [Zenzic Sentinel] Local core detected. Using: $CORE_PATH"
        uv run --project "$CORE_PATH" zenzic check all --strict "${GUARD[@]}" {{args}}
    else
        echo "🛡️  [Zenzic Sentinel] Local core not found. Using published PyPI release..."
        uvx zenzic@0.7.0 check all --strict "${GUARD[@]}" {{args}}
    fi
typecheck:
    npm run typecheck

lint-ts:
    npm run lint:ts

markdownlint:
    npm run lint:md

reuse:
    uvx reuse lint

bump version badge='':
    @bash scripts/bump-version.sh "{{version}}" "{{badge}}"

doctor:
    @node -v || echo "node missing"
    @npm -v || echo "npm missing"
    @uv --version || echo "uv missing"

_check-hooks:
    #!/usr/bin/env bash
    if [ ! -f .git/hooks/pre-push ]; then
        echo -e "\033[33m⚠️  WARNING: Pre-push hook is not installed.\033[0m"
        echo "Without it, you might accidentally push broken code to GitHub and fail the remote CI."
        echo "👉 Fix it by running: uvx pre-commit install -t pre-push"
        echo ""
    fi
