# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0

# just - developer workflow for zenzic-doc
# Use `just --list` to see available commands.

# Install locked dependencies deterministically
setup:
    npm ci

# Start local development server (EN only — language switcher non funziona in dev)
start:
    npm run start

# Start local development server in Italian
start-it:
    npm run start:it

# Serve production build locally (EN + IT, language switcher funzionante)
serve:
    npm run serve

# Alias for serve (preview production build)
preview:
    npm run serve

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

# Clean generated artifacts
clean:
    rm -rf build .docusaurus
