# SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
# SPDX-License-Identifier: Apache-2.0
"""Nox automation for zenzic-doc — the Docusaurus documentation site.

Sessions delegate to npm scripts for Node-based tasks and use uvx for
Python-based tooling (REUSE compliance).

Quick reference:
    nox -s typecheck   — Static type checking (tsc)
    nox -s build       — Production build (EN + IT)
    nox -s reuse       — REUSE/SPDX licence compliance
    nox -s preflight   — Full CI-equivalent pipeline
"""

import nox

nox.options.reuse_existing_virtualenvs = True

# Default sessions for fast feedback
nox.options.sessions = ["typecheck", "reuse"]


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
    """Full CI-equivalent pipeline: typecheck → build → reuse."""
    session.run("npm", "run", "typecheck", external=True)
    session.run("npm", "run", "build", external=True)
    session.run("uvx", "reuse", "lint", external=True)
