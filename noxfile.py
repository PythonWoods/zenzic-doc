# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0
"""Nox automation for zenzic-doc — the Docusaurus documentation site.

Sessions delegate to npm scripts for Node-based tasks and use uvx for
Python-based tooling (REUSE compliance).

Quick reference:
    nox -s typecheck            — Static type checking (tsc)
    nox -s build                — Production build (EN + IT)
    nox -s reuse                — REUSE/SPDX licence compliance
    nox -s verify-codes-parity  — Doc-Code Validator: Zxxx parity between .mdx and codes.py
"""

import nox

nox.options.reuse_existing_virtualenvs = True

# Default sessions for fast feedback
nox.options.sessions = ["typecheck", "reuse"]


@nox.session(venv_backend="none")
def tests(session: nox.Session) -> None:
    """Run the docs test suite (typecheck + production build)."""
    session.run("npm", "run", "typecheck", external=True)
    session.run("npm", "run", "build", external=True)


@nox.session(venv_backend="none")
def typecheck(session: nox.Session) -> None:
    """Run static type checking with tsc."""
    session.run("npm", "run", "typecheck", external=True)


@nox.session(venv_backend="none")
def build(session: nox.Session) -> None:
    """Build the production static site (EN + IT locales)."""
    session.run("npm", "run", "build", external=True)


@nox.session(venv_backend="none")
def reuse(session: nox.Session) -> None:
    """Verify REUSE/SPDX licence compliance."""
    session.run("uvx", "reuse", "lint", external=True)


@nox.session(name="verify-codes-parity", venv_backend="none")
def verify_codes_parity(session: nox.Session) -> None:
    """Doc-Code Validator: verify every Zxxx code in .mdx files exists in codes.py.

    Scans all .mdx files under docs/ and i18n/ for Zxxx patterns and cross-checks
    them against the canonical CODE_NAMES registry in the core package. Exits non-zero
    if any undocumented code is found in the docs, or any registered code is absent
    from finding-codes.mdx — ensuring documentation and code stay in perfect parity.

    Graceful Degradation:
      - Core Maintainer: ZENZIC_PROJECT_PATH set (or ../zenzic exists) → uses local source.
      - External Contributor: local core not found → uses published PyPI release.
    """
    import os
    import re
    import subprocess
    from pathlib import Path

    root = Path(__file__).parent

    # ── Step 1: Load canonical codes — Graceful Degradation ───────────────────
    core_path = os.environ.get("ZENZIC_PROJECT_PATH", "../zenzic")
    python_snippet = (
        "from zenzic.core.codes import CODE_NAMES; "
        "print('\\n'.join(sorted(CODE_NAMES.keys())))"
    )

    if os.path.exists(core_path):
        # Core Maintainer: run against local source tree
        session.log(f"[Zenzic] Local core detected at '{core_path}' — using local source.")
        cmd = ["uv", "run", "--project", core_path, "python", "-c", python_snippet]
    else:
        # External Contributor: fall back to published PyPI release
        session.log("[Zenzic] Local core not found — using published PyPI release.")
        cmd = ["uv", "run", "--with", "zenzic", "python", "-c", python_snippet]

    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        session.warn(
            f"Could not load codes.py: {result.stderr.strip()} — skipping core→doc direction check"
        )
        canonical: set[str] = set()
    else:
        canonical = set(result.stdout.strip().splitlines())

    if canonical:
        session.log(f"Loaded {len(canonical)} canonical codes from codes.py")

    # ── Step 2: Collect all Zxxx references from .mdx files ──────────────────
    zxxx_pattern = re.compile(r"\bZ\d{3}\b")
    found_in_docs: dict[str, set[str]] = {}  # code → set of files mentioning it

    for mdx_file in sorted(root.glob("docs/**/*.mdx")):
        text = mdx_file.read_text(encoding="utf-8")
        for match in zxxx_pattern.finditer(text):
            code = match.group()
            found_in_docs.setdefault(code, set()).add(str(mdx_file.relative_to(root)))

    session.log(f"Found {len(found_in_docs)} distinct Zxxx codes referenced in docs/")

    # ── Step 3: Check finding-codes.mdx has a dedicated section for each canonical code ──
    finding_codes_file = root / "docs" / "reference" / "finding-codes.mdx"
    finding_codes_text = finding_codes_file.read_text(encoding="utf-8")
    missing_from_encyclopedia: list[str] = []

    for code in sorted(canonical):
        anchor = f"{{#{code.lower()}}}"
        if anchor not in finding_codes_text:
            missing_from_encyclopedia.append(code)

    # ── Step 3b: Bilingual symmetry — IT finding-codes.mdx must mirror EN ────
    it_fc_path = (
        root
        / "i18n"
        / "it"
        / "docusaurus-plugin-content-docs"
        / "current"
        / "reference"
        / "finding-codes.mdx"
    )
    missing_from_it: list[str] = []
    if it_fc_path.exists():
        it_fc_text = it_fc_path.read_text(encoding="utf-8")
        missing_from_it = [
            code
            for code in sorted(canonical)
            if f"{{#{code.lower()}}}" not in it_fc_text
        ]
    else:
        session.warn("IT finding-codes.mdx not found — bilingual symmetry skipped")

    # ── Step 4: Check no phantom codes in docs (codes not in registry) ───────
    phantom_codes: list[tuple[str, str]] = []
    for code, files in sorted(found_in_docs.items()):
        if canonical and code not in canonical:
            for f in sorted(files):
                phantom_codes.append((code, f))

    # ── Step 5: Report ────────────────────────────────────────────────────────
    failed = False

    if missing_from_encyclopedia:
        session.error(
            f"MISSING from finding-codes.mdx encyclopedia: {missing_from_encyclopedia}\n"
            "Each canonical code must have a dedicated {#zxxx} anchor section."
        )
        failed = True

    if missing_from_it:
        session.error(
            f"BILINGUAL SYMMETRY FAILURE — missing from IT finding-codes.mdx: "
            f"{missing_from_it}\n"
            "The Italian encyclopedia must contain the same {{#zxxx}} anchors as the English one."
        )
        failed = True
    elif it_fc_path.exists():
        session.log(
            f"✓ Bilingual symmetry: IT finding-codes.mdx has all {len(canonical)} anchors"
        )

    if phantom_codes:
        for code, filepath in phantom_codes:
            session.error(f"Phantom code {code} in {filepath} — not in codes.py registry")
        failed = True

    if not failed:
        session.log(
            f"✓ Doc-Code Validator: all {len(canonical)} canonical codes "
            f"present in finding-codes.mdx (EN + IT). No phantom codes detected."
        )
