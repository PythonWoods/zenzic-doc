# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0

# just - Release Enterprise workflow for zenzic-doc (MkDocs Material architecture)
# Sprint 0.14.1: Migrated from zensical alpha SSG to stable mkdocs-material.
set shell := ["bash", "-c"]

# Allow local override via ZENZIC_BIN (e.g. "uv run --project ../zenzic zenzic").
# In CI/CD the installed `zenzic` binary is used by default.
ZENZIC_CMD := env_var_or_default("ZENZIC_BIN", "zenzic")

# Use `just --list` to see available commands

# --- SETUP & MAINTENANCE ---

# Install locked dependencies deterministically (Python/uv)
setup:
    uv sync

# Clean generated artifacts
clean:
    rm -rf site/

# Deep clean: remove artifacts and virtual environment
clean-all: clean
    rm -rf .venv

# --- DEVELOPMENT ---

# Start local development server (English)
# Default port: 8000. Override example: `just start -a localhost:8080`
start *args:
    uv run mkdocs serve {{args}}

# Serve production build locally (English)
serve *args: build-docs
    uv run mkdocs serve {{args}}

# Build then serve production site locally
preview *args: build-docs
    uv run mkdocs serve {{args}}

# --- BUILD ---

# Build the static documentation (EN) — English-Only ecosystem.
# Requires the external Tailwind CSS artifact at docs/assets/css/zenzic-tailwind.min.css
# to be compiled by the human operator before invoking this target.
build-docs:
    @echo "=> [ZENZIC I/O] Ensuring Tailwind CSS artifact exists..."
    @test -f docs/assets/css/zenzic-tailwind.min.css || (echo "FATAL: zenzic-tailwind.min.css missing. Build external artifact first." && exit 1)
    @echo "=> [ZENZIC BUILD] Compiling English Documentation..."
    uv run mkdocs build --strict
    @echo "=> [ZENZIC SUCCESS] Build complete. Output in site/."

# --- QUALITY GATES ---

# Fast local checks (pre-commit on staged files)
lint *args:
    uvx pre-commit run {{args}}

# Stamp DQS score badges in README.md (mutation — pre-commit hook runs this automatically).
# Run manually only when bypassing pre-commit (e.g. after git commit --no-verify).
stamp:
    just score --stamp --no-header

# Recommended final local check (verify sequence: hooks + docs audit + build + score + freshness)
# Note: --stamp runs at pre-commit time (hook: just-score-stamp). This pre-push gate is read-only.
verify: _check-hooks release-contracts check-pinning lint-all build-docs check
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

# --- INTERNAL RECIPES (Hidden from 'just --list') ---

lint-all:
    uvx pre-commit run --all-files

markdownlint:
    uvx pymarkdownlnt scan docs/

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

reuse:
    uvx reuse lint

doctor:
    @python3 --version || echo "python3 missing"
    @uv --version || echo "uv missing"
    @uv run mkdocs --version || echo "mkdocs-material missing (run: uv sync)"
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
    git commit -S -s -m "release: bump version to ${version}"

# Show the current project version
version:
    @uvx --from "bump-my-version==1.2.6" bump-my-version show current_version

# Show the current project version and the pinned infrastructure versions
versions:
    #!/usr/bin/env python3
    import subprocess, re
    docs = subprocess.check_output(["uvx", "--from", "bump-my-version==1.2.6", "bump-my-version", "show", "current_version"]).decode().strip()
    print(f"docs:        {docs.split()[-1]}")
    try:
        c = open(".github/workflows/zenzic.yml").read()
        v = re.search(r'version:\s*"([^"]+)"', c)
        a = re.search(r'uses:\s*PythonWoods/zenzic-action@([a-f0-9]{40}(?: # [^\n]+)?)', c)
        print(f"zenzic-core: {v.group(1) if v else 'unknown'}")
        print(f"action:      {a.group(1) if a else 'unknown'}")
    except Exception:
        pass

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

_check-hooks:
    #!/usr/bin/env bash
    _missing=0
    if [ ! -f .git/hooks/pre-commit ]; then
        echo -e "\033[33m⚠️  WARNING: pre-commit hook is not installed.\033[0m"
        echo "Without it, linters and checks will NOT run automatically on git commit."
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
    grep -q -- '--dry-run --allow-dirty --verbose' justfile
    if sed -n '/^release part:/,/^[^[:space:]].*:/p' justfile | tail -n +2 | grep -q -- '--allow-dirty'; then
        echo "release-contracts failed: release part must not use --allow-dirty"
        exit 1
    fi
    if sed -n '/^release part:/,/^[^[:space:]].*:/p' justfile | tail -n +2 | grep -qE 'git[[:space:]]+tag'; then
        echo "release-contracts failed: release part must not create tags"
        exit 1
    fi
    if ! grep -q 'git commit -S -s' justfile; then
        echo "release-contracts failed: all git commits must use DCO (-s) and GPG signing (-S)"
        exit 1
    fi

# Pin the Zenzic core version in GitHub Actions workflows
pin-core version:
    #!/usr/bin/env python3
    import subprocess, glob, re
    version = "{{version}}"
    print(f"Pinning Zenzic core to version {version}...")
    for file in glob.glob(".github/workflows/*.yml"):
        with open(file, "r") as f: content = f.read()
        # Safely replace the version string
        new_content = re.sub(r'version: "[^"]+"', f'version: "{version}"', content)
        if content != new_content:
            with open(file, "w") as f: f.write(new_content)
            print(f"Updated {file}")
    print("Staging and committing workflow updates...")
    subprocess.run(["git", "add", ".github/workflows/"], check=True)
    subprocess.run(["git", "commit", "-S", "-s", "-m", f"build(ci): pin zenzic core to v{version} in workflows"], check=True)
    print("Pin-core atomic operation complete.")

# Pin the Zenzic Action to a specific version tag and auto-resolve its immutable SHA
pin-action tag:
    #!/usr/bin/env python3
    import subprocess, glob, re, sys
    tag = "{{tag}}"
    if not tag.startswith("v"):
        tag = "v" + tag
    print(f"Resolving SHA for PythonWoods/zenzic-action tag {tag}...")
    try:
        out = subprocess.check_output(["git", "ls-remote", "https://github.com/PythonWoods/zenzic-action.git", f"refs/tags/{tag}"]).decode()
    except subprocess.CalledProcessError:
        sys.exit("Failed to query remote repository.")

    sha = out.split()[0] if out else None
    if not sha:
        sys.exit(f"Error: Tag {tag} not found on remote.")

    print(f"Resolved to SHA: {sha}")

    for file in glob.glob(".github/workflows/*.yml"):
        with open(file, "r") as f: content = f.read()
        # Replace the uses: line with the new SHA and tag comment
        new_content = re.sub(
            r'uses: PythonWoods/zenzic-action@[a-f0-9]{40}( # v.*)?',
            f'uses: PythonWoods/zenzic-action@{sha} # {tag}',
            content
        )
        if content != new_content:
            with open(file, "w") as f: f.write(new_content)
            print(f"Updated {file}")
    print("Staging and committing workflow updates...")
    subprocess.run(["git", "add", ".github/workflows/"], check=True)
    subprocess.run(["git", "commit", "-S", "-s", "-m", f"build(ci): pin zenzic-action to {tag} ({sha[:7]}) in workflows"], check=True)
    print("Pin-action atomic operation complete.")
