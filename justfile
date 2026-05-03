# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0

# just - Obsidian Enterprise workflow for zenzic-doc
set shell := ["bash", "-c"]
zenzic_project := env_var_or_default("ZENZIC_PROJECT_PATH", "../zenzic")

# Use `just --list` to see available commands

# --- SETUP & MAINTENANCE ---

# Install locked dependencies deterministically
setup:
    npm ci

# Clean generated artifacts
clean:
    rm -rf build .docusaurus

# Deep clean: remove artifacts and node_modules (preserves package-lock.json for reproducible npm ci)
clean-all: clean
    rm -rf node_modules

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

# Run the Zenzic Sentinel quality check only (faster than full preflight)
sentinel:
    bash scripts/pre-commit-zenzic.sh

# Run all pre-commit hooks against every tracked file (mirrors CI gate exactly)
preflight:
    uvx pre-commit run --all-files

# Explicit Zenzic audit gate (uses local unreleased core)
check:
    uv run --project {{zenzic_project}} zenzic check all --engine docusaurus --strict

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
