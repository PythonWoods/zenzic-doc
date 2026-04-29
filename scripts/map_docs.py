#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0
"""
Sentinel Doc Mapper — CEO-085
Scans docs/ using _category_.json files to map the Diátaxis quadrant structure
and updates the [CODE MAP] section in .github/copilot-instructions.md.

Output tells the AI exactly where to place new content without asking.
"""
import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
DOCS_ROOT = REPO_ROOT / "docs"
LEDGER = REPO_ROOT / ".github" / "copilot-instructions.md"

MAP_START = "<!-- MAP_START -->"
MAP_END = "<!-- MAP_END -->"

# The four canonical Diátaxis quadrants + community.
QUADRANT_PURPOSE = {
    "tutorials": "Learning-oriented. Step-by-step guides for beginners. New file → here.",
    "how-to": "Task-oriented. Goal-driven guides for practitioners. New recipe → here.",
    "reference": "Information-oriented. Exhaustive technical reference. New Zxxx code, CLI flag → here.",
    "explanation": "Understanding-oriented. Conceptual deep-dives. New ADR narrative → here.",
    "community": "Contributing, governance, brand, developer guides.",
}


def _read_category(path: Path) -> dict:
    """Reads a _category_.json and returns its metadata."""
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        return {
            "label": data.get("label", path.parent.name),
            "position": data.get("position", 99),
        }
    except (json.JSONDecodeError, OSError):
        return {"label": path.parent.name, "position": 99}


def _count_mdx(directory: Path) -> int:
    """Counts .mdx files directly in a directory (non-recursive)."""
    return sum(1 for f in directory.iterdir() if f.suffix == ".mdx" and f.is_file())


def _scan_quadrant(quadrant_dir: Path, indent: str = "") -> list[str]:
    """Recursively scans a quadrant directory and returns Markdown lines."""
    lines = []
    if not quadrant_dir.exists():
        return lines

    # Direct .mdx files in this directory
    mdx_files = sorted(f for f in quadrant_dir.iterdir() if f.suffix == ".mdx")
    for f in mdx_files:
        lines.append(f"{indent}- `{f.name}`")

    # Subdirectories with their own _category_.json
    subdirs = sorted(
        d for d in quadrant_dir.iterdir()
        if d.is_dir() and not d.name.startswith(".")
    )
    for sub in subdirs:
        cat_file = sub / "_category_.json"
        if cat_file.exists():
            meta = _read_category(cat_file)
            n = sum(1 for _ in sub.rglob("*.mdx"))
            lines.append(f"{indent}- **`{sub.name}/`** — {meta['label']} ({n} files)")
            # One level of recursion for nested quadrants
            lines.extend(_scan_quadrant(sub, indent + "  "))

    return lines


def build_doc_map() -> str:
    """Builds the Markdown [CODE MAP] block for the documentation structure."""
    lines = [
        "## [CODE MAP] — Struttura Documentazione (Diátaxis)",
        "",
        "> Auto-generato da `scripts/map_docs.py` via filesystem scan.",
        "> Aggiornare con `just map-update` dopo ogni aggiunta/rimozione di pagine.",
        "",
        "### Regola di Posizionamento",
        "",
        "| Quadrante | Scopo | Aggiungi qui quando... |",
        "|-----------|-------|------------------------|",
        "| `tutorials/` | Learning-oriented | L'utente deve *imparare* qualcosa di nuovo |",
        "| `how-to/` | Task-oriented | L'utente vuole *fare* qualcosa di specifico |",
        "| `reference/` | Information-oriented | Si documenta un nuovo `Zxxx`, flag CLI, o config |",
        "| `explanation/` | Understanding-oriented | Si spiega il *perché* di una decisione architetturale |",
        "| `community/` | Contributing / governance | Contribuzione, governance, brand, guide sviluppatori |",
        "",
        "### Mappa Completa",
        "",
    ]

    # Enumerate quadrants in Diátaxis order
    ordered = ["tutorials", "how-to", "reference", "explanation", "community"]
    for quadrant_name in ordered:
        quadrant_dir = DOCS_ROOT / quadrant_name
        if not quadrant_dir.exists():
            continue

        cat_file = quadrant_dir / "_category_.json"
        meta = _read_category(cat_file) if cat_file.exists() else {"label": quadrant_name}
        total = sum(1 for _ in quadrant_dir.rglob("*.mdx"))
        purpose = QUADRANT_PURPOSE.get(quadrant_name, "")

        lines.append(f"#### `{quadrant_name}/` — {meta['label']} ({total} files)")
        if purpose:
            lines.append(f"> {purpose}")
        lines.append("")
        lines.extend(_scan_quadrant(quadrant_dir))
        lines.append("")

    # IT mirror summary
    it_root = REPO_ROOT / "i18n" / "it" / "docusaurus-plugin-content-docs" / "current"
    it_total = sum(1 for _ in it_root.rglob("*.mdx")) if it_root.exists() else 0
    en_total = sum(1 for _ in DOCS_ROOT.rglob("*.mdx"))

    lines.append("### Bilingual Symmetry Check")
    lines.append("")
    lines.append(f"| Locale | Files |")
    lines.append(f"|--------|-------|")
    lines.append(f"| `docs/` (EN) | {en_total} |")
    lines.append(f"| `i18n/it/` (IT) | {it_total} |")

    if en_total != it_total:
        lines.append(f"")
        lines.append(f"> **[⚠️ ASYMMETRY]** EN={en_total} IT={it_total} — run symmetry diff before committing.")
    else:
        lines.append(f"")
        lines.append(f"> ✅ EN/IT parity confirmed.")

    return "\n".join(lines)


def update_ledger(doc_map: str) -> None:
    """Replaces the block between MAP_START and MAP_END in the ledger."""
    text = LEDGER.read_text(encoding="utf-8")
    start_idx = text.find(MAP_START)
    end_idx = text.find(MAP_END)

    if start_idx == -1 or end_idx == -1:
        print(
            f"[ERROR] Tags {MAP_START!r} or {MAP_END!r} not found in {LEDGER}.\n"
            "Add the tags to copilot-instructions.md before running map-update.",
            file=sys.stderr,
        )
        sys.exit(1)

    new_block = f"{MAP_START}\n{doc_map}\n{MAP_END}"
    new_text = text[:start_idx] + new_block + text[end_idx + len(MAP_END):]
    LEDGER.write_text(new_text, encoding="utf-8")
    print(f"[DOC MAP] updated in {LEDGER.relative_to(REPO_ROOT)}")


def main() -> None:
    if not DOCS_ROOT.exists():
        print(f"[ERROR] docs/ not found in {REPO_ROOT}", file=sys.stderr)
        sys.exit(1)

    doc_map = build_doc_map()
    update_ledger(doc_map)

    en_total = sum(1 for _ in DOCS_ROOT.rglob("*.mdx"))
    print(f"[OK] {en_total} EN pages mapped across Diátaxis quadrants.")


if __name__ == "__main__":
    main()
