# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0

# just - developer workflow for zenzic-doc
# Use `just --list` to see available commands.

# Install locked dependencies deterministically
setup:
    npm ci

# Start local development server (single-locale; locale dropdown inactive in dev mode)
# Use 'just serve' after 'just build' to test the locale switcher in a production environment
start:
    npm run start

# Start local development server in Italian (single-locale dev mode)
start-it:
    npm run start:it

# Serve production build locally (EN + IT, language switcher funzionante)
serve:
    npm run serve

# Alias for serve (preview production build)
preview:
    npm run serve

# Build production static site
build:
    npm run build

# Static type check
typecheck:
    npm run typecheck

# Lint TypeScript/React source files (excluding intentional landing monolith)
lint:
    npm run lint:ts

# Lint Markdown and MDX files
markdownlint:
    npm run lint:md

# Enterprise local gate: type safety + production build
verify: markdownlint lint typecheck build

# Run all pre-commit hooks against every tracked file (mirrors CI gate exactly)
preflight:
    uvx pre-commit run --all-files

# Check REUSE/SPDX licence compliance
reuse:
    uvx reuse lint

# Run the Zenzic Sentinel quality check only (faster than full preflight)
sentinel:
    bash scripts/pre-commit-zenzic.sh

# Clean generated artifacts
clean:
    rm -rf build .docusaurus

# Bump all hardcoded Zenzic version references.
# Usage:  just bump 0.6.3
#         just bump 0.6.3 'v0.6.3 "Obsidian Flux" Stable'
bump version badge='':
    @bash scripts/bump-version.sh "{{version}}" "{{badge}}"
