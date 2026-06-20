# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0
"""Nox automation for zenzic-doc — the Docusaurus documentation site.

Sessions delegate to npm scripts for Node-based tasks and use uvx for
Python-based tooling (REUSE compliance).

Quick reference:
    nox -s typecheck  — Static type checking (tsc)
    nox -s build      — Production build (EN + IT)
    nox -s reuse      — REUSE/SPDX licence compliance
"""

import os
from pathlib import Path

import nox
_ROOT = Path(__file__).resolve().parent

nox.options.reuse_existing_virtualenvs = True

# Default sessions for fast feedback
nox.options.sessions = ["typecheck", "reuse"]


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
