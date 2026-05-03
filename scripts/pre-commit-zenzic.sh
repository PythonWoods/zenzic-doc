#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0

# ── Sentinel Guard ─────────────────────────────────────────────────
# Zenzic Sentinel pre-commit bootstrap.
#
# Strategy:
#   Use a local zenzic checkout only (never uvx).
#   Path resolution order:
#     1) $ZENZIC_PROJECT_PATH (if set)
#     2) ../zenzic
#     3) ./zenzic
#
# Virtualenv-safe: UV_NO_SYNC prevents uv from auto-syncing into
# an active .venv.
# ───────────────────────────────────────────────────────────────────

set -euo pipefail

# Prevent uv from syncing into an active .venv
export UV_NO_SYNC=1

ZENZIC_PATH="${ZENZIC_PROJECT_PATH:-}"

if [ -z "${ZENZIC_PATH}" ] && [ -d "../zenzic" ] && [ -f "../zenzic/pyproject.toml" ]; then
    ZENZIC_PATH="../zenzic"
fi

if [ -z "${ZENZIC_PATH}" ] && [ -d "./zenzic" ] && [ -f "./zenzic/pyproject.toml" ]; then
    ZENZIC_PATH="./zenzic"
fi

if [ -z "${ZENZIC_PATH}" ]; then
    echo "ERROR: local zenzic checkout not found. Set ZENZIC_PROJECT_PATH to a local repo path." >&2
    exit 1
fi

echo "Mode: Local Zenzic (${ZENZIC_PATH})"
uv run --project "${ZENZIC_PATH}" zenzic check all --engine docusaurus --strict
