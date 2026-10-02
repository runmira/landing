'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { SCRIPT_COMMAND } from './InstallCommand';

/**
 * The Install section's one command, in whichever form you prefer: a tab
 * per way to install, one terminal line that never wraps, one copy button.
 */
const WAYS = [
  { id: 'script', label: 'Install script', command: SCRIPT_COMMAND, note: 'macOS and Linux · no Homebrew needed' },
  { id: 'brew', label: 'Homebrew', command: 'brew install runmira/tap/mira', note: 'macOS and Linux · upgrades with brew upgrade' },
  {
    id: 'source',
    label: 'From source',
    command: 'cargo install --path mira/crates/mira-cli',
    note: 'Rust 1.88+ · from a clone of runmira/mira',
  },
] as const;

export function InstallTabs() {
  const [active, setActive] = useState<(typeof WAYS)[number]['id']>('script');
  const [copied, setCopied] = useState(false);
  const way = WAYS.find((w) => w.id === active)!;

  async function copy() {
    try {
      await navigator.clipboard.writeText(way.command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard blocked: the command is still selectable.
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div role="tablist" aria-label="Ways to install" className="mx-auto flex w-fit gap-1 rounded-full border border-ink/10 bg-white/60 p-1 backdrop-blur-sm">
        {WAYS.map((w) => (
          <button
            key={w.id}
            type="button"
            role="tab"
            aria-selected={w.id === active}
            onClick={() => {
              setActive(w.id);
              setCopied(false);
            }}
            className={`whitespace-nowrap rounded-full px-3 py-2 text-[12.5px] font-semibold transition-colors sm:px-4 sm:text-[13px] ${
              w.id === active ? 'bg-obsidian text-ghost shadow-md shadow-ink/15' : 'text-ink/55 hover:text-ink'
            }`}
          >
            {w.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-5 overflow-hidden rounded-3xl bg-obsidian shadow-xl shadow-coral/15">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[11px] font-medium text-ghost/40">{way.note}</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-4 sm:gap-4 sm:px-5 sm:py-5">
          <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-ghost sm:text-[15px]">
            <span className="select-none font-bold text-coral">$ </span>
            {way.command}
          </code>
          <button
            type="button"
            onClick={copy}
            aria-label={`Copy: ${way.command}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-coral p-2.5 text-[11px] font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-coral/90 sm:px-4 sm:py-2"
          >
            {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
