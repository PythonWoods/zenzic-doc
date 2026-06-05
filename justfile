# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0

# just - Release Enterprise workflow for zenzic-doc
set shell :=["bash", "-c"]

# Allow local override via ZENZIC_BIN (e.g. "uv run --project ../zenzic zenzic").
# In CI/CD the installed `zenzic` binary is used by default.
ZENZIC_CMD := env_var_or_default("ZENZIC_BIN", "zenzic")

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

# Stamp DQS score badges in README.md and README.it.md (mutation — pre-commit hook runs this automatically).
# Run manually only when bypassing pre-commit (e.g. after git commit --no-verify).
stamp:
    just score --stamp --no-header

# Recommended final local check (verify sequence: hooks + docs audit + build + codes parity + score + freshness)
# Note: --stamp runs at pre-commit time (hook: just-score-stamp). This pre-push gate is read-only.
verify: _check-hooks release-contracts check-pinning lint-all build verify-codes check
    just score --check-stamp --no-header

# ADR-089 — Immutable Infrastructure guard on local hooks (internal CI policy,
# not a public Zenzic linter rule). Pre-commit `rev:` keys must be 40-char
# commit SHAs, not mutable tags. Regex anchored to line-start so the
# `# vX.Y.Z` annotation comment is safe.
check-pinning:
    #!/usr/bin/env bash
    set -euo pipefail
    echo "Validating Immutable Infrastructure (ADR-089)..."
    if grep -E '^[[:space:]]*rev:[[:space:]]*v?[0-9]+\.[0-9]+' .pre-commit-config.yaml >/dev/null 2>&1; then
        echo "[ADR-089] FATAL: Unpinned tag detected in pre-commit config. Zenzic internal policy requires SHA-256 pinning." >&2
        grep -nE '^[[:space:]]*rev:[[:space:]]*v?[0-9]+\.[0-9]+' .pre-commit-config.yaml >&2
        echo "👉 Update via: uvx pre-commit autoupdate --freeze" >&2
        exit 1
    fi
    echo "✓ ADR-089: all pre-commit hooks pinned to immutable commit hashes."

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

    if [[ -n "${ZENZIC_BIN:-}" ]]; then
        ${ZENZIC_BIN} check all --strict ${ZENZIC_EXTRA_ARGS:-} {{args}}
        exit 0
    fi

    CORE_PATH=""
    CHECKED=()

    if [[ -n "${ZENZIC_CORE_PATH:-}" ]]; then
        CHECKED+=("ZENZIC_CORE_PATH -> ${ZENZIC_CORE_PATH}")
        if [[ -d "${ZENZIC_CORE_PATH}/src/zenzic" ]]; then
            CORE_PATH="${ZENZIC_CORE_PATH}"
        fi
    fi

    if [[ -z "$CORE_PATH" ]]; then
        CHECKED+=("_zenzic_core -> _zenzic_core")
        if [[ -d "_zenzic_core/src/zenzic" ]]; then
            CORE_PATH="_zenzic_core"
        fi
    fi

    if [[ -z "$CORE_PATH" ]]; then
        CHECKED+=("../zenzic -> ../zenzic")
        if [[ -d "../zenzic/src/zenzic" ]]; then
            CORE_PATH="../zenzic"
        fi
    fi

    if [[ -n "$CORE_PATH" ]]; then
        echo "🛡️  [Zenzic] Local core detected. Using: $CORE_PATH"
        uv run --project "$CORE_PATH" zenzic check all --strict ${ZENZIC_EXTRA_ARGS:-} {{args}}
    elif command -v zenzic >/dev/null 2>&1; then
        zenzic check all --strict ${ZENZIC_EXTRA_ARGS:-} {{args}}
    else
        echo "❌ [Zenzic] Core repository not found in sovereign search order and 'zenzic' not found on PATH." >&2
        echo "Required precedence: ZENZIC_CORE_PATH -> ./_zenzic_core -> ../zenzic" >&2
        echo "Each candidate must contain src/zenzic." >&2
        echo "Checked: ${CHECKED[*]}" >&2
        echo "Fail-closed policy active: PyPI fallback is prohibited." >&2
        exit 2
    fi

score *args:
    #!/usr/bin/env bash
    set -euo pipefail

    if [[ -n "${ZENZIC_BIN:-}" ]]; then
        ${ZENZIC_BIN} score {{args}}
        exit 0
    fi

    CORE_PATH=""
    CHECKED=()

    if [[ -n "${ZENZIC_CORE_PATH:-}" ]]; then
        CHECKED+=("ZENZIC_CORE_PATH -> ${ZENZIC_CORE_PATH}")
        if [[ -d "${ZENZIC_CORE_PATH}/src/zenzic" ]]; then
            CORE_PATH="${ZENZIC_CORE_PATH}"
        fi
    fi

    if [[ -z "$CORE_PATH" ]]; then
        CHECKED+=("_zenzic_core -> _zenzic_core")
        if [[ -d "_zenzic_core/src/zenzic" ]]; then
            CORE_PATH="_zenzic_core"
        fi
    fi

    if [[ -z "$CORE_PATH" ]]; then
        CHECKED+=("../zenzic -> ../zenzic")
        if [[ -d "../zenzic/src/zenzic" ]]; then
            CORE_PATH="../zenzic"
        fi
    fi

    if [[ -n "$CORE_PATH" ]]; then
        echo "🛡️  [Zenzic] Local core detected. Using: $CORE_PATH"
        uv run --project "$CORE_PATH" zenzic score {{args}}
    elif command -v zenzic >/dev/null 2>&1; then
        zenzic score {{args}}
    else
        echo "❌ [Zenzic] Core repository not found in sovereign search order and 'zenzic' not found on PATH." >&2
        echo "Required precedence: ZENZIC_CORE_PATH -> ./_zenzic_core -> ../zenzic" >&2
        echo "Each candidate must contain src/zenzic." >&2
        echo "Checked: ${CHECKED[*]}" >&2
        echo "Fail-closed policy active: PyPI fallback is prohibited." >&2
        exit 2
    fi
typecheck:
    npm run typecheck

lint-ts:
    npm run lint:ts

markdownlint:
    npm run lint:md

reuse:
    uvx reuse lint

# Release orchestration: explicit, transparent, and lockfile-first.
release part:
    #!/usr/bin/env bash
    set -euo pipefail
    case "{{ part }}" in
        patch|minor|major) ;;
        *) echo "Invalid part '{{ part }}'. Use patch|minor|major"; exit 2 ;;
    esac
    uvx --from "bump-my-version==1.2.6" bump-my-version bump {{ part }}
    version="$(uvx --from "bump-my-version==1.2.6" bump-my-version show current_version)"
    git add -u
    git commit -m "release: bump version to ${version}"

# Show the current project version
version:
    @uvx --from "bump-my-version==1.2.6" bump-my-version show current_version

# Simulate a release bump without modifying any files
# Usage: just release-dry patch|minor|major [--short]
release-dry part *args:
    #!/usr/bin/env bash
    set -euo pipefail
    _short=false
    for _arg in {{args}}; do [[ "$_arg" == "--short" ]] && _short=true; done
    if $_short; then
        uvx --from "bump-my-version==1.2.6" bump-my-version bump {{part}} --dry-run --allow-dirty --verbose 2>&1 \
            | grep -E 'current version|New version will be|Dry run'
    else
        uvx --from "bump-my-version==1.2.6" bump-my-version bump {{part}} --dry-run --allow-dirty --verbose
    fi

doctor:
    @node -v || echo "node missing"
    @npm -v || echo "npm missing"
    @uv --version || echo "uv missing"

_check-hooks:
    #!/usr/bin/env bash
    _missing=0
    if [ ! -f .git/hooks/pre-commit ]; then
        echo -e "\033[33m⚠️  WARNING: pre-commit hook is not installed.\033[0m"
        echo "Without it, linters and type-checks will NOT run automatically on git commit."
        echo "👉 Fix it by running: uvx pre-commit install"
        echo ""
        _missing=1
    fi
    if [ ! -f .git/hooks/pre-push ]; then
        echo -e "\033[33m⚠️  WARNING: pre-push hook is not installed.\033[0m"
        echo "Without it, you might accidentally push broken code to GitHub and fail the remote CI."
        echo "👉 Fix it by running: uvx pre-commit install -t pre-push"
        echo ""
        _missing=1
    fi

# Enforce release contracts: dirty allowed only in release-dry.
release-contracts:
    #!/usr/bin/env bash
    set -euo pipefail
    grep -qE '^version:' justfile
    grep -qE '^release part:' justfile
    grep -qE '^release-dry part' justfile
    grep -qE '^verify:[[:space:]].*\bverify-codes\b' justfile
    grep -qE '^[[:space:]]+uvx nox -s verify-codes-parity$' justfile
    grep -q -- '--dry-run --allow-dirty --verbose' justfile
    if sed -n '/^release part:/,/^[^[:space:]].*:/p' justfile | tail -n +2 | grep -q -- '--allow-dirty'; then
        echo "release-contracts failed: release part must not use --allow-dirty"
        exit 1
    fi
    if sed -n '/^release part:/,/^[^[:space:]].*:/p' justfile | tail -n +2 | grep -qE 'git[[:space:]]+tag'; then
        echo "release-contracts failed: release part must not create tags"
        exit 1
    fi
