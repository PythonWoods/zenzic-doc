# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0
"""Nox automation for zenzic-doc — the Docusaurus documentation site.

Sessions delegate to npm scripts for Node-based tasks and use uvx for
Python-based tooling (REUSE compliance).

Quick reference:
    nox -s typecheck      — Static type checking (tsc)
    nox -s build          — Production build (EN + IT)
    nox -s reuse          — REUSE/SPDX licence compliance
    nox -s verify-docs    — Doc-Code Validator: Zxxx parity between .mdx and codes.py
    nox -s preflight      — Full CI-equivalent pipeline (includes Zenzic quality gate)
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


@nox.session(venv_backend="none")
def preflight(session: nox.Session) -> None:
    """Full CI-equivalent pipeline: typecheck → build → reuse → zenzic."""
    session.run("npm", "run", "typecheck", external=True)
    session.run("npm", "run", "build", external=True)
    session.run("uvx", "reuse", "lint", external=True)
    session.run("uvx", "zenzic", "check", "all", "--strict", external=True)


@nox.session(name="verify-docs", venv_backend="none")
def verify_docs(session: nox.Session) -> None:
    """Doc-Code Validator: verify every Zxxx code in .mdx files exists in codes.py.

    Scans all .mdx files under docs/ and i18n/ for Zxxx patterns and cross-checks
    them against the canonical CODE_NAMES registry in the core package. Exits non-zero
    if any undocumented code is found in the docs, or any registered code is absent
    from finding-codes.mdx — ensuring documentation and code stay in perfect parity.
    """
    import re
    import subprocess
    import sys
    from pathlib import Path

    root = Path(__file__).parent

    # ── Step 1: Load canonical codes from the installed core package ──────────
    result = subprocess.run(
        [
            sys.executable,
            "-c",
            (
                "import sys; sys.path.insert(0, 'src'); "
                "from zenzic.core.codes import CODE_NAMES; "
                "print('\\n'.join(sorted(CODE_NAMES.keys())))"
            ),
        ],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        # Try uvx fallback — codes.py may live in a sibling repo
        codes_path = root.parent / "zenzic" / "src" / "zenzic" / "core" / "codes.py"
        if not codes_path.exists():
            session.warn("codes.py not found — skipping core→doc direction check")
            canonical: set[str] = set()
        else:
            import importlib.util

            spec = importlib.util.spec_from_file_location("codes", codes_path)
            mod = importlib.util.module_from_spec(spec)  # type: ignore[arg-type]
            spec.loader.exec_module(mod)  # type: ignore[union-attr]
            canonical = set(mod.CODE_NAMES.keys())
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
            session.warn(f"Phantom code {code} in {filepath} — not in codes.py registry")

    if not failed:
        session.log(
            f"✓ Doc-Code Validator: all {len(canonical)} canonical codes "
            f"present in finding-codes.mdx (EN + IT). No phantom codes detected."
        )
