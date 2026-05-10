// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

/**
 * SentinelOutput — Live React replica of Zenzic's terminal output.
 *
 * Self-contained, theme-aware panel matching the landing page (SentinelSection)
 * design system. Text is selectable, weight is near-zero, dark/light parity is
 * exact.  Replaces static SVG + TerminalWindow combinations entirely.
 *
 * Usage in MDX (globally registered — no import required):
 *
 *   <SentinelOutput variant="clean" />
 *   <SentinelOutput variant="findings" />
 *   <SentinelOutput variant="breach" />
 *   <SentinelOutput variant="breach" location="docs/setup.md:42" masked="ghp_****3456" />
 *
 * Tailwind Invariant (RULE): Never interpolate class names dynamically.
 * All variant-specific classes are expressed as static string literals in the
 * WRAPPER_CLASSES map so Tailwind JIT can detect them at build time.
 */

import React from 'react';

type Variant = 'clean' | 'breach' | 'findings' | 'inspect';

/**
 * Domain-specific status discriminant.
 * Maps to an internal Variant for rendering.
 *
 * | status      | variant    | Exit | Meaning                          |
 * |-------------|------------|------|----------------------------------|
 * | 'success'   | 'clean'    |  0   | Integrity verified               |
 * | 'error'     | 'findings' |  1   | Structural/link violation        |
 * | 'warning'   | 'findings' |  0–1 | Non-blocking anomaly             |
 * | 'inspect'   | 'inspect'  |  0   | Audit/debug mode                 |
 * | 'breach'    | 'breach'   |  2   | Security perimeter compromised   |
 */
export type Status = 'success' | 'error' | 'warning' | 'inspect' | 'breach';
export type ScoringTier = 'core' | 'structure' | 'content' | 'governance' | 'security';
export type ReleaseState = 'active' | 'inactive';

const STATUS_TO_VARIANT: Record<Status, Variant> = {
  success: 'clean',
  error:   'findings',
  warning: 'findings',
  inspect: 'inspect',
  breach:  'breach',
};

/**
 * A single finding row rendered inside the `findings` variant.
 *
 * @example
 *   rows={[{ code: 'Z101', file: 'docs/setup.md:14', message: 'Broken link → install.md', severity: 'error' }]}
 */
export interface FindingRow {
  /** Zxxx code or custom rule ID (e.g. "Z101", "ZZ-NODRAFT") */
  code: string;
  /** File path with optional line number (e.g. "docs/guides/setup.md:14") */
  file: string;
  /** Human-readable finding message */
  message: string;
  /** Visual severity — controls icon and colour. Defaults to 'error'. */
  severity?: 'error' | 'warning' | 'info';
  /** ADR-012 ownership tier associated to this finding code. */
  tier?: ScoringTier;
  /** Runtime status from governance controls. */
  state?: ReleaseState;
}

/**
 * A single scanner row rendered inside the `inspect` variant.
 */
export interface InspectRow {
  /** Z-code range (e.g. "Z201", "Z101\u2013106") */
  codes: string;
  /** Scanner display name (e.g. "The Shield") */
  scanner: string;
  /** Short capability description */
  capability: string;
  /** Exit code string (e.g. "2", "1") */
  exit: string;
  /** Optional emoji icon prefix */
  icon?: string;
  /** True for non-suppressible security exits (exit 2 & 3) */
  security?: boolean;
  /** ADR-012 ownership tier represented by this scanner block. */
  tier?: ScoringTier;
  /** Runtime status from governance controls. */
  state?: ReleaseState;
}

interface SentinelOutputProps {
  /**
   * Legacy variant discriminant — preserved for backward compatibility.
   * Prefer `status` for new usages.
   *
   * @deprecated Use `status` instead. Will emit a console.warn in development
   * when used without a `status` prop.
   */
  variant?: Variant;
  /**
   * Domain-specific status. Takes precedence over `variant` when both are
   * provided. One of `status` or `variant` is required.
   */
  status?: Status;
  /**
   * Zenzic finding code shown in this output (e.g. `"Z101"`).
   * Strongly recommended when `status="error"` or `status="warning"`.
   * Absence emits a console.warn: a finding without a code violates
   * the Absolute Traceability principle.
   * When provided, the code is linked to the corresponding section in
   * `reference/finding-codes`.
   */
  code?: string;
  /**
   * CI exit code surfaced by this audit result.
   * | Code | Meaning                          |
   * |------|----------------------------------|
   * |  0   | Clean — no issues               |
   * |  1   | Findings — quality issues       |
   * |  2   | Shield — credential detected   |
   * |  3   | Blood Sentinel — path traversal |
   */
  exitCode?: 0 | 1 | 2 | 3;
  /**
   * When true, enables a deep link from the finding location to the
   * source file in the repository. Requires `location` to be set.
   */
  traceability?: boolean;
  /**
   * Show the macOS-style title bar with traffic-light dots.
   * Use true for Quick Start / Tutorial context (tool-in-use framing).
   * Omit (false) for Explanation sections where the output is embedded in prose.
   */
  showFrame?: boolean;
  /**
   * Compact mode — hides telemetry footer (file count, elapsed time).
   * Ideal for Reference pages where a single finding is the focal point.
   */
  compact?: boolean;
  /** Override breach location (default: docs/how-to/configure.md:4) */
  location?: string;
  /** Override masked credential string (default: AKIA************MPLE) */
  masked?: string;
  /** Override credential type label (default: aws-access-key) */
  credentialType?: string;
  /**
   * Override finding rows for the `findings` variant.
   * When provided, the footer shows derived counts but omits the Quality Score
   * (which would be fabricated). Omit to use the canonical default 3-row demo.
   */
  rows?: FindingRow[];
  /** Override scanner rows for the `inspect` variant. Omit to use built-in default (EN) list. */
  scanners?: InspectRow[];
  /**
   * Activate strict mode footer on the `findings` variant.
   * Renders: "STRICT MODE: Warnings have been promoted to errors."
   */
  isStrict?: boolean;
}

// ── Static class maps — NEVER interpolate these strings ─────────────────────
// All class names must appear verbatim here for Tailwind JIT to detect them.
const WRAPPER_CLASSES: Record<Variant, string> = {
  clean:
    'dark:bg-zinc-900/20 bg-emerald-50/20 backdrop-blur-md rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed shadow-2xl',
  breach:
    'dark:bg-zinc-900/20 bg-rose-50/30 backdrop-blur-md rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed shadow-2xl',
  findings:
    'dark:bg-zinc-900/20 bg-zinc-50 backdrop-blur-md rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed shadow-2xl',
  inspect:
    'dark:bg-zinc-900/20 bg-indigo-50/50 backdrop-blur-md rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed shadow-2xl',
};

// Conditional perimeter — present only when no macOS frame wraps the output
const BORDER_CLASSES: Record<Variant, string> = {
  clean:    'border dark:border-emerald-900/20 border-emerald-200/50',
  breach:   '',
  findings: 'border dark:border-zinc-700/20 border-zinc-200',
  inspect:  'border dark:border-indigo-500/10 border-indigo-200/50',
};

const CONTAINER_CLASSES: Record<Variant, string> = {
  clean:    'max-w-xl mx-auto my-6',
  breach:   'max-w-xl mx-auto my-6',
  findings: 'max-w-xl mx-auto my-6',
  inspect:  'max-w-2xl mx-auto my-6',};

// ── Clean variant — 100/100 Sentinel Seal ───────────────────────────────────

function CleanOutput({ compact = false }: { compact?: boolean }): React.JSX.Element {
  const rows = [
    { label: 'Structural Integrity', pts: '40 pts', detail: '0 broken links' },
    { label: 'Content Excellence',   pts: '30 pts', detail: '0 placeholders' },
    { label: 'Navigation',           pts: '20 pts', detail: '0 orphan pages' },
    { label: 'Brand & Assets',       pts: '10 pts', detail: '0 brand violations' },
  ];

  return (
    <>
      <div className="space-y-1 mb-4">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-2">
            <span className="text-emerald-500 w-4 flex-shrink-0 select-none">✔</span>
            <span className="dark:text-zinc-300 text-zinc-700 flex-1">{r.label}</span>
            <span className="dark:text-zinc-500 text-zinc-400 w-14 text-right">{r.pts}</span>
            <span className="dark:text-zinc-400 text-zinc-500 w-32 text-right">{r.detail}</span>
          </div>
        ))}
      </div>

      <div className="border-t dark:border-emerald-900/40 border-emerald-200/60 pt-3 mb-3">
        <div className="flex items-center gap-2 justify-center">
          <span className="select-none">🏆</span>
          <span className="dark:text-zinc-400 text-zinc-600">Quality Score:</span>
          <span className="text-emerald-400 font-bold">100 / 100</span>
          <span className="dark:text-emerald-500 text-emerald-600">◆ Sentinel Seal</span>
        </div>
      </div>

      <div className="border-t dark:border-emerald-900/40 border-emerald-200/60 pt-3 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-emerald-500 select-none">✔</span>
          <span className="dark:text-zinc-400 text-zinc-600">Shield: no credentials detected</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-500 select-none">✔</span>
          <span className="dark:text-zinc-400 text-zinc-600">Blood Sentinel: no path-traversal attempts</span>
        </div>
        {!compact && (
          <div className="dark:text-zinc-600 text-zinc-400 pt-1">
            Files scanned: 47 &nbsp;·&nbsp; Elapsed: 0.28 s
          </div>
        )}
      </div>
    </>
  );
}

// ── Breach variant — Z201 Shield Breach ─────────────────────────────────────

function BreachOutput({
  location = 'docs/how-to/configure.md:4',
  masked = 'AKIA************MPLE',
  credentialType = 'aws-access-key',
}: Pick<SentinelOutputProps, 'location' | 'masked' | 'credentialType'>): React.JSX.Element {
  return (
    <>
      <div className="-mx-6 -mt-5 mb-4 bg-[#8b0000] text-white font-bold px-6 py-2 text-center tracking-[0.2em]">
        ✘ SECURITY BREACH DETECTED
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-3">
          <span className="text-rose-500 flex-shrink-0 select-none">✘</span>
          <span className="w-24 dark:text-zinc-500 text-zinc-400 flex-shrink-0">Finding:</span>
          <span className="dark:text-zinc-200 text-zinc-700">
            Secret detected ({credentialType}) — rotate immediately.
          </span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-rose-500 flex-shrink-0 select-none">✘</span>
          <span className="w-24 dark:text-zinc-500 text-zinc-400 flex-shrink-0">Location:</span>
          <span className="dark:text-zinc-200 text-zinc-700">{location}</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-rose-500 flex-shrink-0 select-none">✘</span>
          <span className="w-24 dark:text-zinc-500 text-zinc-400 flex-shrink-0">Credential:</span>
          <span className="bg-rose-500/10 dark:text-rose-200 text-rose-700 px-2 py-0.5 rounded-sm">
            {masked}
          </span>
        </div>
      </div>

      <div className="border-t dark:border-rose-900/20 border-rose-200 pt-3 space-y-1">
        <div className="dark:text-zinc-500 text-zinc-500">
          Exit code{' '}
          <span className="dark:text-zinc-300 text-zinc-700 font-bold">2</span>
          {' '}— this finding is never suppressible.
        </div>
        <div className="dark:text-zinc-600 text-zinc-400">
          Rotate the credential, then run{' '}
          <span className="dark:text-zinc-400 text-zinc-600 italic">zenzic check all</span>
          {' '}to verify.
        </div>
      </div>
    </>
  );
}

// ── Findings variant — dynamic rows ──────────────────────────────────────

const DEFAULT_ROWS: FindingRow[] = [
  { code: 'Z101', file: 'docs/guides/setup.md:14',    message: "Broken link → 'install.md' (target not found)",         severity: 'error' },
  { code: 'Z402', file: 'docs/guides/old-api.md',     message: 'Orphan page — not reachable from any navigation',     severity: 'error' },
  { code: 'Z501', file: 'docs/reference/config.md:3', message: 'Placeholder: "TODO: describe this parameter"',         severity: 'warning' },
];

function SEVERITY_ICON(sev: FindingRow['severity']): React.JSX.Element {
  if (sev === 'warning') return <span className="text-amber-500 flex-shrink-0 select-none">⚠</span>;
  if (sev === 'info')    return <span className="dark:text-zinc-400 text-zinc-400 flex-shrink-0 select-none">ℹ</span>;
  return                        <span className="text-rose-500 flex-shrink-0 select-none">✘</span>;
}

function FindingsOutput({
  rows: customRows,
  compact = false,
  isStrict = false,
}: {
  rows?: FindingRow[];
  compact?: boolean;
  isStrict?: boolean;
}): React.JSX.Element {
  const hasCustomRows = customRows !== undefined;
  const rows = hasCustomRows ? customRows! : DEFAULT_ROWS;

  const errorCount   = rows.filter(r => !r.severity || r.severity === 'error').length;
  const warningCount = rows.filter(r => r.severity === 'warning').length;

  return (
    <>
      <div className="space-y-2 mb-4">
        {rows.map((r, i) => (
          <div key={i} className="flex items-start gap-2">
            {SEVERITY_ICON(r.severity)}
            <span className="text-cyan-500 dark:text-cyan-400 w-44 flex-shrink-0 truncate">{r.file}</span>
            <span className="dark:text-zinc-500 text-zinc-400 w-14 flex-shrink-0">{r.code}</span>
            <span className="dark:text-zinc-300 text-zinc-700">{r.message}</span>
          </div>
        ))}
      </div>

      <div className="border-t dark:border-zinc-800/40 border-zinc-200 pt-3 flex flex-wrap gap-4">
        {errorCount > 0 && (
          <span className="text-rose-500 font-medium">✘ {errorCount} {errorCount === 1 ? 'error' : 'errors'}</span>
        )}
        {warningCount > 0 && (
          <span className="text-amber-500 font-medium">⚠ {warningCount} {warningCount === 1 ? 'warning' : 'warnings'}</span>
        )}
        {!hasCustomRows && (
          <span className="dark:text-zinc-500 text-zinc-500">
            Score:{' '}
            <span className="dark:text-zinc-300 text-zinc-700 font-bold">67 / 100</span>
          </span>
        )}
        {!compact && (
          <span className="dark:text-zinc-600 text-zinc-400">Files: 42 · Elapsed: 0.31 s</span>
        )}
      </div>
      {isStrict && (
        <div className="mt-2 text-amber-500 font-medium">
          STRICT MODE: Warnings have been promoted to errors.
        </div>
      )}
    </>
  );
}
// ── Inspect variant — scanner arsenal table ───────────────────────────────────

const DEFAULT_SCANNERS: InspectRow[] = [
  { codes: 'Z201',     scanner: 'The Shield',       capability: 'Credential & security detection',      exit: '2', icon: '🛡', security: true, tier: 'security', state: 'active' },
  { codes: 'Z202–203', scanner: 'Blood Sentinel',   capability: 'Path-traversal & jailbreak detection', exit: '3', icon: '🩸', security: true, tier: 'security', state: 'active' },
  { codes: 'Z101–106', scanner: 'Link Validator',   capability: 'Broken links & anchor resolution',     exit: '1', icon: '🔗', tier: 'core', state: 'active' },
  { codes: 'Z401–406', scanner: 'Structure Guard',  capability: 'Orphans, assets & navigation contract', exit: '1', icon: '🏗', tier: 'structure', state: 'active' },
  { codes: 'Z501–505', scanner: 'Content Sentinel', capability: 'Placeholders, snippets & score',       exit: '1', icon: '📄', tier: 'content', state: 'active' },
  { codes: 'Z601–602', scanner: 'Governance Watch', capability: 'Brand obsolescence & i18n parity',     exit: '1', icon: '🏛', tier: 'governance', state: 'active' },
];

function InspectOutput({ scanners: customScanners }: { scanners?: InspectRow[] }): React.JSX.Element {
  const rows = customScanners ?? DEFAULT_SCANNERS;
  return (
    <>
      <div className="text-indigo-700 dark:text-indigo-300 font-bold text-xs tracking-widest mb-3 select-none">
        CORE SCANNERS  (built-in)
      </div>

      <div className="grid grid-cols-[6rem_9rem_1fr_5rem_5rem_3.5rem] gap-x-3 border-b border-indigo-200 dark:border-indigo-500/20 pb-2 mb-2">
        <span className="text-indigo-700 dark:text-indigo-300 font-semibold">Codes</span>
        <span className="text-indigo-700 dark:text-indigo-300 font-semibold">Scanner</span>
        <span className="text-indigo-700 dark:text-indigo-300 font-semibold">Capability</span>
        <span className="text-indigo-700 dark:text-indigo-300 font-semibold">Tier</span>
        <span className="text-indigo-700 dark:text-indigo-300 font-semibold">State</span>
        <span className="text-indigo-700 dark:text-indigo-300 font-semibold text-right">Exit</span>
      </div>

      <div className="space-y-1.5 mb-4">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-[6rem_9rem_1fr_5rem_5rem_3.5rem] gap-x-3 items-center">
            <span className="dark:text-zinc-300 text-zinc-700">{r.codes}</span>
            <span className="dark:text-zinc-300 text-zinc-700">
              {r.icon && <span className="mr-1 select-none">{r.icon}</span>}
              {r.scanner}
            </span>
            <span className="dark:text-zinc-400 text-zinc-600">{r.capability}</span>
            <span className="dark:text-zinc-400 text-zinc-600">{r.tier ?? '-'}</span>
            <span className="dark:text-zinc-400 text-zinc-600">{r.state ?? '-'}</span>
            <span className={r.security ? 'text-right font-bold text-amber-400' : 'text-right font-bold dark:text-zinc-400 text-zinc-500'}>
              {r.exit}{r.security ? ' ⚠' : ''}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-indigo-200 dark:border-indigo-500/20 pt-3 space-y-1.5">
        <div className="dark:text-zinc-500 text-zinc-500 text-[11px]">
          <span className="text-amber-400 select-none">⚠</span>{' '}
          Exit 2 and Exit 3 are non-suppressible —{' '}
          <span className="dark:text-zinc-400 text-zinc-600 italic">--exit-zero</span>{' '}
          has no effect on Shield or Blood Sentinel.
        </div>
        <div className="dark:text-zinc-600 text-zinc-400 text-[11px]">
          Extensible Rules{' '}
          <span className="dark:text-zinc-600 text-zinc-400">(plugin system — </span>
          <span className="dark:text-zinc-500 text-zinc-500">zenzic.rules</span>
          <span className="dark:text-zinc-600 text-zinc-400"> entry-point group)</span>
          <br />
          <span className="ml-4">— No third-party plugins installed. Register rules via the zenzic.rules entry-point group.</span>
        </div>
      </div>
    </>
  );
}
// ── Main export ──────────────────────────────────────────────────────────────

export default function SentinelOutput({
  variant: variantProp,
  status,
  code,
  exitCode,
  traceability = false,
  showFrame = false,
  compact = false,
  rows,
  scanners,
  location,
  masked,
  credentialType,
  isStrict = false,
}: SentinelOutputProps): React.JSX.Element {
  // Resolve effective variant: `status` takes precedence over legacy `variant`.
  let variant: Variant;
  if (status !== undefined) {
    variant = STATUS_TO_VARIANT[status];
  } else if (variantProp !== undefined) {
    if (process.env.NODE_ENV === 'development') {

      console.warn(
        '[SentinelOutput] ‘variant’ is deprecated. Use ‘status’ instead. ' +
        `Received variant="${variantProp}".`
      );
    }
    variant = variantProp;
  } else {
    // Neither status nor variant provided: fall back to a safe default.
    if (process.env.NODE_ENV === 'development') {

      console.error('[SentinelOutput] Neither ‘status’ nor ‘variant’ was provided. Rendering ‘clean’ as fallback.');
    }
    variant = 'clean';
  }

  // Traceability guard: status="error"|"warning" without `code` violates
  // the Absolute Traceability principle.
  if (
    process.env.NODE_ENV === 'development' &&
    (status === 'error' || status === 'warning') &&
    code === undefined
  ) {

    console.warn(
      '[SentinelOutput] ‘code’ is strongly recommended when status="error" or status="warning". ' +
      'A finding without a Zxxx code violates the Absolute Traceability principle.'
    );
  }

  // Unused in rendering for now — exitCode and traceability are declared
  // for forward-compat with server-side rendering and future interactive
  // deep-link support.
  void exitCode;
  void traceability;

  const borderClass = showFrame ? '' : BORDER_CLASSES[variant];
  const inner = (
    <div className={`${WRAPPER_CLASSES[variant]} ${borderClass}`}>
      {variant === 'clean' && <CleanOutput compact={compact} />}
      {variant === 'breach' && (
        <BreachOutput
          location={location}
          masked={masked}
          credentialType={credentialType}
        />
      )}
      {variant === 'findings' && <FindingsOutput rows={rows} compact={compact} isStrict={isStrict} />}
      {variant === 'inspect' && <InspectOutput scanners={scanners} />}
    </div>
  );

  return (
    <div className={CONTAINER_CLASSES[variant]}>
      {showFrame ? (
        <div
          style={{
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow:
              '0 2px 8px rgba(0,0,0,0.6), 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.45), 0 0 24px rgba(79,70,229,0.12)',
            border: '1px solid rgba(99,102,241,0.45)',
          }}
        >
          {/* macOS title bar */}
          <div
            style={{
              background: 'linear-gradient(180deg,#2d2d2d 0%,#252525 100%)',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block', flexShrink: 0 }} />
          </div>
          {inner}
        </div>
      ) : (
        inner
      )}
    </div>
  );
}
