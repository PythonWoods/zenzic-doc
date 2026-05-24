// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

/**
 * CapExceededSummary — Visual replica of the Sovereign Job Summary block
 * rendered by zenzic-action when SUPPRESSION_CAP_EXCEEDED is detected.
 *
 * Self-contained, theme-aware panel matching the Zenzic design system.
 * Zinc palette foundation, amber/rose accent for CAP alarm state.
 *
 * Usage in MDX (globally registered — no import required):
 *
 *   <CapExceededSummary activeSuppressions={43} globalCap={30} />
 *   <CapExceededSummary activeSuppressions={28} globalCap={30}
 *     remediationUrl="https://zenzic.dev/developers/how-to/release-governance-protocol" />
 *
 * State variants:
 *   delta ≤ 0          → 'ok'     green — CAP within limit
 *   0 < delta ≤ 10     → 'warn'   amber — CAP approaching / just exceeded
 *   delta > 10         → 'breach' rose  — CAP significantly exceeded
 *
 * Tailwind Invariant (RULE): Never interpolate class names dynamically.
 * All variant-specific classes are expressed as static string literals in
 * VARIANT_* maps so Tailwind JIT can detect them at build time.
 */

import React from 'react';
import Translate from '@docusaurus/Translate';

export interface CapExceededSummaryProps {
  activeSuppressions: number;
  globalCap: number;
  remediationUrl?: string;
}

type DeltaVariant = 'ok' | 'warn' | 'breach';

function getDeltaVariant(delta: number): DeltaVariant {
  if (delta <= 0) return 'ok';
  if (delta <= 10) return 'warn';
  return 'breach';
}

// ── Static class maps — NEVER interpolate these strings ─────────────────────
// All class names must appear verbatim here for Tailwind JIT to detect them.

const WRAPPER_BORDER: Record<DeltaVariant, string> = {
  ok:     'dark:border-emerald-900/40 border-emerald-200',
  warn:   'dark:border-amber-900/40 border-amber-200',
  breach: 'dark:border-rose-900/40 border-rose-200',
};

const HEADER_BG: Record<DeltaVariant, string> = {
  ok:     'dark:bg-emerald-900/20 bg-emerald-50',
  warn:   'dark:bg-amber-900/20 bg-amber-50',
  breach: 'dark:bg-rose-900/20 bg-rose-50',
};

const ICON_COLOR: Record<DeltaVariant, string> = {
  ok:     'text-emerald-500',
  warn:   'text-amber-500',
  breach: 'text-rose-500',
};

// Badge pill: the +N counter shown in the header when delta > 0
const BADGE_CLASSES: Record<DeltaVariant, string> = {
  ok:     'text-emerald-400 bg-emerald-500/10',
  warn:   'text-amber-500 bg-amber-500/10',
  breach: 'text-rose-400 bg-rose-500/10',
};

// Debt column: large numeral in the metrics grid
const DEBT_CLASSES: Record<DeltaVariant, string> = {
  ok:     'dark:text-emerald-400 text-emerald-600',
  warn:   'text-amber-500',
  breach: 'text-rose-400',
};

const ICON: Record<DeltaVariant, string> = {
  ok:     '✔',
  warn:   '⚠',
  breach: '✘',
};

export default function CapExceededSummary({
  activeSuppressions,
  globalCap,
  remediationUrl,
}: CapExceededSummaryProps): React.JSX.Element {
  const delta = activeSuppressions - globalCap;
  const variant = getDeltaVariant(delta);

  const title =
    variant === 'ok' ? (
      <Translate id="cap.title.ok">Suppression CAP — Within Limit</Translate>
    ) : variant === 'warn' ? (
      <Translate id="cap.title.warn">Suppression CAP — Approaching Limit</Translate>
    ) : (
      <Translate id="cap.title.breach">Suppression CAP Exceeded</Translate>
    );

  const debtLabel =
    delta > 0 ? `+${delta}` : delta === 0 ? '±0' : String(delta);

  return (
    <div
      className={`my-6 overflow-hidden rounded-xl border dark:bg-zinc-900/40 bg-white font-mono shadow-sm ${WRAPPER_BORDER[variant]}`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between border-b px-5 py-3 ${WRAPPER_BORDER[variant]} ${HEADER_BG[variant]}`}
      >
        <span className={`text-[13px] font-semibold tracking-wide ${ICON_COLOR[variant]}`}>
          {ICON[variant]}{' '}
          <span className="dark:text-zinc-200 text-zinc-800">{title}</span>
        </span>
        {delta > 0 && (
          <span
            className={`rounded-sm px-2 py-0.5 text-[11px] font-bold tabular-nums ${BADGE_CLASSES[variant]}`}
          >
            +{delta}
          </span>
        )}
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-3 divide-x dark:divide-zinc-800 divide-zinc-100">
        <div className="flex flex-col items-center gap-1 px-3 py-5">
          <span className="dark:text-zinc-500 text-zinc-400 text-[10px] tracking-widest uppercase">
            <Translate id="cap.col.active">Active suppressions</Translate>
          </span>
          <span className="dark:text-zinc-100 text-zinc-900 text-2xl font-light tabular-nums">
            {activeSuppressions}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 px-3 py-5">
          <span className="dark:text-zinc-500 text-zinc-400 text-[10px] tracking-widest uppercase">
            <Translate id="cap.col.limit">CAP limit</Translate>
          </span>
          <span className="dark:text-zinc-100 text-zinc-900 text-2xl font-light tabular-nums">
            {globalCap}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 px-3 py-5">
          <span className="dark:text-zinc-500 text-zinc-400 text-[10px] tracking-widest uppercase">
            <Translate id="cap.col.debt">Excess debt</Translate>
          </span>
          <span className={`text-2xl font-light tabular-nums ${DEBT_CLASSES[variant]}`}>
            {debtLabel}
          </span>
        </div>
      </div>

      {/* Remediation link */}
      {remediationUrl && (
        <div
          className={`border-t px-5 py-3 dark:bg-zinc-900/20 bg-zinc-50 ${WRAPPER_BORDER[variant]}`}
        >
          <a
            href={remediationUrl}
            className="text-[11px] tracking-wide dark:text-amber-400 text-amber-600 hover:underline"
          >
            {'📋 '}
            <Translate id="cap.remediation">Remediation Playbook</Translate>
            {' →'}
          </a>
        </div>
      )}
    </div>
  );
}
