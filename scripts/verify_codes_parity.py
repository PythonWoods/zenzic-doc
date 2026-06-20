# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0
"""Validate docs Zxxx parity against core code registries.

This script is designed to run with the zenzic core interpreter context:

    uv run --project ../zenzic python scripts/verify_codes_parity.py

Fail-closed policy is enforced through the core ACL regex facade.
"""

from __future__ import annotations

import sys
from pathlib import Path

from zenzic.core.codes import CODE_NAMES, LEGACY_TO_CODE
from zenzic.core import regex as re

ROOT = Path(__file__).resolve().parent.parent

_CODE_TOKEN_RE = re.compile(r"\bZ\d{3}\b")
# Post-migration: files are .md (Markdown), not .mdx (JSX).
# Delimiters changed from JSX comments {/* */} to HTML comments <!-- -->.
_MIGRATION_MATRIX_START = "<!-- zenzic:migration-matrix:start -->"
_MIGRATION_MATRIX_END = "<!-- zenzic:migration-matrix:end -->"
_MATRIX_ROW_RE = re.compile(r"\|\s*`?(Z\d{3})`?\s*\|\s*`?(Z\d{3})`?\s*\|")


def _iter_parity_files(root: Path) -> list[Path]:
    """Return all documentation files to scan for Zxxx references."""
    roots = [
        root / "docs",
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
    if _MIGRATION_MATRIX_START not in text or _MIGRATION_MATRIX_END not in text:
        return {}
    start_idx = text.index(_MIGRATION_MATRIX_START) + len(_MIGRATION_MATRIX_START)
    end_idx = text.index(_MIGRATION_MATRIX_END)
    block = text[start_idx:end_idx]
    return {legacy.upper(): active.upper() for legacy, active in _MATRIX_ROW_RE.findall(block)}


def main() -> int:
    active_codes = {str(code).upper() for code in CODE_NAMES}
    legacy_to_code = {
        str(k).upper(): str(v).upper()
        for k, v in LEGACY_TO_CODE.items()
    }
    legacy_codes = set(legacy_to_code)
    known_codes = active_codes | legacy_codes

    found_in_docs: dict[str, set[str]] = {}
    for source_file in _iter_parity_files(ROOT):
        text = source_file.read_text(encoding="utf-8")
        rel = str(source_file.relative_to(ROOT))
        for match in _CODE_TOKEN_RE.finditer(text):
            code = match.group().upper()
            found_in_docs.setdefault(code, set()).add(rel)

    en_fc_path = ROOT / "docs" / "reference" / "finding-codes.md"
    en_fc_text = en_fc_path.read_text(encoding="utf-8")

    missing_active_en = [
        code for code in sorted(active_codes) if f"{{#{code.lower()}}}" not in en_fc_text
    ]
    legacy_matrix_en = _extract_legacy_matrix(en_fc_text)

    missing_legacy_en = sorted(code for code in legacy_codes if code not in legacy_matrix_en)

    mismatched_legacy_en = sorted(
        code
        for code in legacy_codes
        if code in legacy_matrix_en and legacy_matrix_en[code] != legacy_to_code[code]
    )
    unexpected_legacy_en = sorted(code for code in legacy_matrix_en if code not in legacy_codes)

    legacy_refs_in_docs = sorted(code for code in found_in_docs if code in legacy_codes)
    legacy_refs_missing_matrix_en = [
        code for code in legacy_refs_in_docs if code not in legacy_matrix_en
    ]
    unknown_codes = sorted(code for code in found_in_docs if code not in known_codes)

    errors: list[str] = []

    if missing_active_en:
        errors.append(
            "MISSING ACTIVE ANCHORS (EN): "
            f"{missing_active_en}. Each active code must expose a dedicated {{#zxxx}} section."
        )
    if not legacy_matrix_en:
        errors.append(
            "MIGRATION MATRIX (EN) not found. "
            "Expected tagged block between zenzic:migration-matrix:start/end."
        )
    if missing_legacy_en:
        errors.append(
            f"LEGACY MATRIX INCOMPLETE (EN) - missing rows for: {missing_legacy_en}"
        )
    if mismatched_legacy_en:
        errors.append(
            f"LEGACY MATRIX MISMATCH (EN) for codes: {mismatched_legacy_en}"
        )
    if unexpected_legacy_en:
        errors.append(
            f"LEGACY MATRIX has unknown legacy rows (EN): {unexpected_legacy_en}"
        )
    if legacy_refs_missing_matrix_en:
        errors.append(
            "Legacy codes referenced in documentation but missing from EN migration matrix: "
            f"{legacy_refs_missing_matrix_en}"
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
        print("\n\n".join(errors), file=sys.stderr)
        return 1

    print(
        "Doc-Code Validator (semantic mode): active anchors validated (EN), "
        "legacy migration matrix validated (EN), no unknown codes detected."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
