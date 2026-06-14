// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0
//
// Tailwind v3 — scoped to homepage partials only.
// Preflight is DISABLED to avoid breaking MkDocs Material Markdown rendering.
// darkMode selector maps to Material for MkDocs' [data-md-color-scheme="slate"].
//
// Zinc palette override: most values match Tailwind v3 defaults (which already
// align with --zenzic-ink-* tokens). Only zinc-900 is overridden to match
// --zenzic-slate-800 (#0f0f13) which is darker than Tailwind's default #18181b.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./overrides/home.html",
    "./overrides/components/homepage/**/*.html",
  ],
  corePlugins: {
    preflight: false, // CRITICAL: do NOT inject Tailwind's CSS reset
  },
  darkMode: ["class", '[data-md-color-scheme="slate"]'],
  theme: {
    extend: {
      colors: {
        zinc: {
          // Override only where ground-truth diverges from Tailwind v3 defaults.
          // zinc-100 (#f4f4f5), zinc-400 (#a1a1aa), zinc-800 (#27272a),
          // zinc-950 (#09090b) already match Tailwind v3 defaults exactly.
          900: "#0f0f13",  // --zenzic-slate-800 (darker than v3 default #18181b)
        },
        indigo: {
          // Brand accent values — v3 defaults for 500/600 already match.
          400: "#808af0",  // --zenzic-brand-soft (v3 default #818cf8, ours #808af0)
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
