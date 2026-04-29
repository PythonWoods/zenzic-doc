// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

/**
 * TerminalWindow — macOS-style terminal frame for SVG terminal assets.
 *
 * Usage in MDX (globally available — no import required):
 *
 *   <TerminalWindow title="zenzic check all">
 *     <img src="/assets/terminal/sentinel-clean.svg" alt="Sentinel Seal — 100/100" />
 *   </TerminalWindow>
 *
 * Props:
 *   title  — text shown in the title bar (default: "zenzic")
 *   alt    — optional subtitle shown next to the dots
 */

import React from 'react';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
}

export default function TerminalWindow({
  title = 'zenzic',
  children,
}: TerminalWindowProps): React.JSX.Element {
  return (
    <div
      style={{
        borderRadius: '10px',
        overflow: 'hidden',
        margin: '1.5rem 0',        maxWidth: '600px',        boxShadow:
          '0 2px 8px rgba(0,0,0,0.6), 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.45), 0 0 24px rgba(79,70,229,0.12)',
        border: '1px solid rgba(99,102,241,0.45)',
        fontFamily: 'monospace',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: 'linear-gradient(180deg,#2d2d2d 0%,#252525 100%)',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Traffic-light dots */}
        <span
          style={{
            width: 11,
            height: 11,
            borderRadius: '50%',
            background: '#ff5f57',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            width: 11,
            height: 11,
            borderRadius: '50%',
            background: '#ffbd2e',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            width: 11,
            height: 11,
            borderRadius: '50%',
            background: '#28c840',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        {/* Title */}
        <span
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.04em',
            marginLeft: '-33px', // compensate for dots to achieve true center
          }}
        >
          {title}
        </span>
      </div>

      {/* Content area — background matches SVG #09090b so no visible seam */}
      <div
        style={{
          background: '#09090b',
          lineHeight: 0,
          display: 'block',
        }}
      >
        {children}
      </div>
    </div>
  );
}
