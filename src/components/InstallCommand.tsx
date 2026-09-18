'use client';

import { useState } from 'react';

const COMMAND = 'brew install runmira/tap/mira';

/**
 * Hero CTA: a capsule that *is* the install command.
 *
 * Reads like a terminal snippet, acts like a button. Filled with the
 * dark `obsidian` so it lands with the same visual weight the old
 * "Install Mira →" pill had against the cream page. The inline copy
 * chip on the right handles the real clipboard write (client-only —
 * that's why this file is `'use client'`).
 */
export function InstallCommand() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard write blocked (permissions / non-secure origin) —
      // silent; triple-click still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy install command"
      className="group inline-flex items-center gap-3 rounded-full bg-obsidian py-2 pl-5 pr-2 font-mono text-sm text-ghost shadow-lg shadow-coral/15 transition-all duration-200 hover:shadow-xl hover:shadow-coral/25 active:scale-95"
    >
      <span className="font-bold text-coral">$</span>
      <span className="text-ghost">{COMMAND}</span>
      <span className="ml-1 rounded-full bg-coral px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white transition-colors group-hover:bg-coral/90">
        {copied ? 'copied' : 'copy'}
      </span>
    </button>
  );
}
