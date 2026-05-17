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

import json
import os
import re
import subprocess
from pathlib import Path

import nox

nox.options.reuse_existing_virtualenvs = True

# Default sessions for fast feedback
nox.options.sessions = ["typecheck", "reuse"]

_CODE_TOKEN_RE = re.compile(r"\bZ\d{3}\b")
_LEGACY_MATRIX_START = "{/* zenzic:legacy-migration-matrix:start */}"
_LEGACY_MATRIX_END = "{/* zenzic:legacy-migration-matrix:end */}"
_MATRIX_ROW_RE = re.compile(r"\|\s*`?(Z\d{3})`?\s*\|\s*`?(Z\d{3})`?\s*\|")


def _normalize_candidate(root: Path, raw_path: str) -> Path:
    """Resolve a candidate core path relative to repository root when needed."""
    candidate = Path(raw_path).expanduser()
    if not candidate.is_absolute():
        candidate = (root / candidate).resolve()
    else:
        candidate = candidate.resolve()
    return candidate


def _display_path(root: Path, path: Path) -> str:
    """Render stable display path for session logs."""
    try:
        return str(path.relative_to(root))
    except ValueError:
        return str(path)


def _resolve_core_path(root: Path, session: nox.Session) -> Path:
    """Resolve local Zenzic core path using sovereign precedence and fail-closed policy."""
    candidates: list[tuple[str, str]] = []

    env_override = os.environ.get("ZENZIC_CORE_PATH")
    if env_override:
        candidates.append(("ZENZIC_CORE_PATH", env_override))

    candidates.extend(
        [
            ("_zenzic_core", "_zenzic_core"),
            ("../zenzic", "../zenzic"),
        ]
    )

    checked: list[str] = []
    for label, raw in candidates:
        candidate = _normalize_candidate(root, raw)
        checked.append(f"{label} -> {_display_path(root, candidate)}")
        if (candidate / "src" / "zenzic").is_dir():
            session.log(
                f"[Zenzic] Local core found at '{_display_path(root, candidate)}' "
                "— using local source metadata."
            )
            return candidate

    session.error(
        "[Zenzic] Core repository not found in sovereign search order.\n"
        "Required precedence: ZENZIC_CORE_PATH -> ./_zenzic_core -> ../zenzic\n"
        "Each candidate must contain src/zenzic.\n"
        f"Checked: {checked}\n"
        "Fail-closed policy active: PyPI fallback is prohibited."
    )
    raise RuntimeError("unreachable")


def _load_core_registry(core_path: Path, session: nox.Session) -> tuple[set[str], dict[str, str]]:
    """Load active and legacy code registries from local core only."""
    python_snippet = (
        "from zenzic.core.codes import CODE_NAMES, LEGACY_TO_CODE; "
        "import json; "
        "print(json.dumps({'active': sorted(CODE_NAMES.keys()), 'legacy': LEGACY_TO_CODE}, "
        "sort_keys=True))"
    )
    cmd = ["uv", "run", "--project", str(core_path), "python", "-c", python_snippet]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        session.error(
            "[Zenzic] Unable to import zenzic.core.codes from local core.\n"
            f"Core path: {_display_path(Path(__file__).parent, core_path)}\n"
            f"stderr: {result.stderr.strip()}"
        )

    payload = json.loads(result.stdout.strip())
    active_codes = {str(code).upper() for code in payload.get("active", [])}
    legacy_to_code = {
        str(k).upper(): str(v).upper()
        for k, v in payload.get("legacy", {}).items()
    }
    return active_codes, legacy_to_code


def _iter_parity_files(root: Path) -> list[Path]:
    """Return all documentation files to scan for Zxxx references."""
    roots = [
        root / "docs",
        root / "i18n" / "it",
    ]
    patterns = ("**/*.mdx", "**/*.md")
    files: list[Path] = []
    for scan_root in roots:
        if not scan_root.exists():
            continue
        for pattern in patterns:
            files.extend(scan_root.glob(pattern))
    return sorted({p.resolve() for p in files})


def _extract_legacy_matrix(text: str) -> dict[str, str]:
    """Parse legacy migration mappings from a tagged matrix section."""
    if _LEGACY_MATRIX_START not in text or _LEGACY_MATRIX_END not in text:
        return {}
    start_idx = text.index(_LEGACY_MATRIX_START) + len(_LEGACY_MATRIX_START)
    end_idx = text.index(_LEGACY_MATRIX_END)
    block = text[start_idx:end_idx]
    return {legacy.upper(): active.upper() for legacy, active in _MATRIX_ROW_RE.findall(block)}


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

    Sovereign Resolution (Fail-Closed):
      - Override: ZENZIC_CORE_PATH
      - CI canonical: ./_zenzic_core
      - Dev fallback: ../zenzic
      - PyPI fallback prohibited.
    """
    root = Path(__file__).parent

    # ── Step 1: Resolve sovereign local core and load SSOT registries ─────────
    core_path = _resolve_core_path(root, session)
    active_codes, legacy_to_code = _load_core_registry(core_path, session)
    legacy_codes = set(legacy_to_code)
    known_codes = active_codes | legacy_codes

    session.log(
        f"Loaded {len(active_codes)} active canonical codes and "
        f"{len(legacy_codes)} legacy mappings from local core"
    )

    # ── Step 2: Collect all Zxxx references from docs + i18n/it ───────────────
    found_in_docs: dict[str, set[str]] = {}
    for source_file in _iter_parity_files(root):
        text = source_file.read_text(encoding="utf-8")
        rel = str(source_file.relative_to(root))
        for match in _CODE_TOKEN_RE.finditer(text):
            code = match.group().upper()
            found_in_docs.setdefault(code, set()).add(rel)

    session.log(
        f"Found {len(found_in_docs)} distinct Zxxx codes referenced across docs/ and i18n/it/"
    )

    # ── Step 3: Validate active code anchors in EN+IT encyclopedias ───────────
    en_fc_path = root / "docs" / "reference" / "finding-codes.mdx"
    it_fc_path = (
        root
        / "i18n"
        / "it"
        / "docusaurus-plugin-content-docs"
        / "current"
        / "reference"
        / "finding-codes.mdx"
    )
    en_fc_text = en_fc_path.read_text(encoding="utf-8")
    it_fc_text = it_fc_path.read_text(encoding="utf-8")

    missing_active_en = [
        code for code in sorted(active_codes) if f"{{#{code.lower()}}}" not in en_fc_text
    ]
    missing_active_it = [
        code for code in sorted(active_codes) if f"{{#{code.lower()}}}" not in it_fc_text
    ]

    # ── Step 4: Validate legacy migration matrix contract in EN+IT ───────────
    legacy_matrix_en = _extract_legacy_matrix(en_fc_text)
    legacy_matrix_it = _extract_legacy_matrix(it_fc_text)

    missing_legacy_en = sorted(code for code in legacy_codes if code not in legacy_matrix_en)
    missing_legacy_it = sorted(code for code in legacy_codes if code not in legacy_matrix_it)

    mismatched_legacy_en = sorted(
        code
        for code in legacy_codes
        if code in legacy_matrix_en and legacy_matrix_en[code] != legacy_to_code[code]
    )
    mismatched_legacy_it = sorted(
        code
        for code in legacy_codes
        if code in legacy_matrix_it and legacy_matrix_it[code] != legacy_to_code[code]
    )

    unexpected_legacy_en = sorted(code for code in legacy_matrix_en if code not in legacy_codes)
    unexpected_legacy_it = sorted(code for code in legacy_matrix_it if code not in legacy_codes)

    # Legacy references in prose must map through the migration matrix contract.
    legacy_refs_in_docs = sorted(code for code in found_in_docs if code in legacy_codes)
    legacy_refs_missing_matrix_en = [
        code for code in legacy_refs_in_docs if code not in legacy_matrix_en
    ]
    legacy_refs_missing_matrix_it = [
        code for code in legacy_refs_in_docs if code not in legacy_matrix_it
    ]

    # ── Step 5: Unknown codes (active fail) ───────────────────────────────────
    unknown_codes = sorted(code for code in found_in_docs if code not in known_codes)

    # ── Step 6: Report ────────────────────────────────────────────────────────
    errors: list[str] = []

    if missing_active_en:
        errors.append(
            "MISSING ACTIVE ANCHORS (EN): "
            f"{missing_active_en}. Each active code must expose a dedicated {{#zxxx}} section."
        )
    if missing_active_it:
        errors.append(
            "MISSING ACTIVE ANCHORS (IT): "
            f"{missing_active_it}. The Italian encyclopedia must mirror active anchor coverage."
        )

    if not legacy_matrix_en:
        errors.append(
            "LEGACY MIGRATION MATRIX (EN) not found. "
            "Expected tagged block between zenzic:legacy-migration-matrix:start/end."
        )
    if not legacy_matrix_it:
        errors.append(
            "LEGACY MIGRATION MATRIX (IT) not found. "
            "Expected tagged block between zenzic:legacy-migration-matrix:start/end."
        )

    if missing_legacy_en:
        errors.append(
            f"LEGACY MATRIX INCOMPLETE (EN) — missing rows for: {missing_legacy_en}"
        )
    if missing_legacy_it:
        errors.append(
            f"LEGACY MATRIX INCOMPLETE (IT) — missing rows for: {missing_legacy_it}"
        )

    if mismatched_legacy_en:
        errors.append(
            f"LEGACY MATRIX MISMATCH (EN) for codes: {mismatched_legacy_en}"
        )
    if mismatched_legacy_it:
        errors.append(
            f"LEGACY MATRIX MISMATCH (IT) for codes: {mismatched_legacy_it}"
        )

    if unexpected_legacy_en:
        errors.append(
            f"LEGACY MATRIX has unknown legacy rows (EN): {unexpected_legacy_en}"
        )
    if unexpected_legacy_it:
        errors.append(
            f"LEGACY MATRIX has unknown legacy rows (IT): {unexpected_legacy_it}"
        )

    if legacy_refs_missing_matrix_en:
        errors.append(
            "Legacy codes referenced in documentation but missing from EN migration matrix: "
            f"{legacy_refs_missing_matrix_en}"
        )
    if legacy_refs_missing_matrix_it:
        errors.append(
            "Legacy codes referenced in documentation but missing from IT migration matrix: "
            f"{legacy_refs_missing_matrix_it}"
        )

    if unknown_codes:
        details = []
        for code in unknown_codes:
            for file_path in sorted(found_in_docs.get(code, set())):
                details.append(f"{code} in {file_path}")
        errors.append(
            "UNKNOWN CODES detected (not present in CODE_NAMES or LEGACY_TO_CODE):\n"
            + "\n".join(details)
        )

    if errors:
        session.error("\n\n".join(errors))

    session.log(
        "✓ Doc-Code Validator (semantic mode): active anchors validated (EN+IT), "
        "legacy migration matrix validated (EN+IT), no unknown codes detected."
    )
