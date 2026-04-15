#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0

# ── Obsidian Guard ─────────────────────────────────────────────────
# Zenzic Sentinel pre-commit bootstrap.
#
# Strategy (Dual-Stage Verification):
#   A. If ../zenzic exists → use the local core (developer workflow)
#   B. Otherwise           → download via uvx --pre  (contributor workflow)
#
# Virtualenv-safe: UV_NO_SYNC prevents uv from auto-syncing into
# an active .venv.  uvx always creates an ephemeral sandbox.
# ───────────────────────────────────────────────────────────────────

set -euo pipefail

# Prevent uv from syncing into an active .venv
export UV_NO_SYNC=1

# Scenario A: Core developer (repos side-by-side)
if [ -d "../zenzic" ] && [ -f "../zenzic/pyproject.toml" ]; then
    echo "Mode: Local Development (../zenzic found)"
    uv run --project ../zenzic zenzic check all --engine docusaurus --strict

# Scenario B: External contributor or isolated environment
else
    echo "Mode: External Contributor (uvx ephemeral sandbox)"
    uvx --pre zenzic check all --engine docusaurus --strict
fi
