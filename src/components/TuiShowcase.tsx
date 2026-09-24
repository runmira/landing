const CALLOUTS = [
  {
    n: '1',
    title: 'Status bar',
    description: 'Active model, permission mode, git branch, and running token spend — always visible at a glance.',
  },
  {
    n: '2',
    title: 'Tool calls',
    description: 'Every file read, grep, and edit streams in real time. Nothing happens behind the scenes.',
  },
  {
    n: '3',
    title: 'Inline diff',
    description: 'File changes render as a compact unified diff before you approve. See exactly what lands.',
  },
  {
    n: '4',
    title: 'Approvals',
    description: 'Press y · n · a · e to control each step without ever leaving the keyboard.',
  },
  {
    n: '5',
    title: 'Composer',
    description: 'Type prompts, run slash commands, mention files with @, and toggle modes with Shift+Tab.',
  },
];

export function TuiShowcase() {
  return (
    <div className="my-8 not-prose">
      <div className="relative">
        {/* ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-3 rounded-[24px] bg-gradient-to-br from-coral/8 via-transparent to-transparent blur-2xl"
        />

        <div className="relative rounded-2xl border border-white/10 bg-obsidian/98 shadow-2xl shadow-ink/20">
          {/* Window chrome */}
          <div className="flex items-center gap-2 rounded-t-2xl border-b border-white/8 bg-white/4 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff6b6b]/80" />
            <span className="h-3 w-3 rounded-full bg-[#ffd93d]/80" />
            <span className="h-3 w-3 rounded-full bg-[#6bcb77]/80" />
            <span className="ml-3 font-mono text-xs text-white/25">
              ~/projects/api — mira
            </span>
          </div>

          <div className="font-mono text-[12.5px] leading-relaxed">

            {/* ① Status bar */}
            <div className="relative flex flex-wrap items-center gap-1.5 border-b border-white/6 px-5 py-2.5 pr-10 text-[11.5px]">
              <span className="font-bold text-coral">ℳ mira</span>
              <span className="text-white/20">·</span>
              <span className="text-white/70">claude-sonnet-4-6</span>
              <span className="text-white/20">·</span>
              <span className="font-bold text-green-400">manual</span>
              <span className="text-white/20">·</span>
              <span className="text-white/45">⎇ main</span>
              <span className="ml-auto text-white/35">↑14.2k ↓5.1k · $0.031</span>
              <Badge n="1" />
            </div>

            {/* transcript */}
            <div className="space-y-4 px-5 py-5">
              {/* user message */}
              <div>
                <span className="font-bold text-coral">&gt; </span>
                <span className="text-white/80">add rate-limiting to POST /api/search</span>
              </div>

              {/* ② tool calls */}
              <div className="relative space-y-1 pr-10">
                <div>
                  <span className="font-bold text-green-400">● </span>
                  <span className="font-bold text-coral">Reading </span>
                  <span className="text-white/65">src/routes/search.ts</span>
                </div>
                <div>
                  <span className="font-bold text-green-400">● </span>
                  <span className="font-bold text-coral">Grep </span>
                  <span className="text-white/65">&quot;rateLimit\|throttle&quot;</span>
                  <span className="text-white/30"> · 2 matches</span>
                </div>
                <div>
                  <span className="font-bold text-green-400">● </span>
                  <span className="font-bold text-coral">Edit </span>
                  <span className="text-white/65">src/routes/search.ts</span>
                  <span className="ml-2 font-bold text-green-400">+9</span>
                  <span className="font-bold text-red-400"> -1</span>
                </div>
                <Badge n="2" />
              </div>

              {/* ③ diff */}
              <div className="relative rounded-lg border border-white/6 bg-white/3 px-4 py-2.5 pr-10 text-[11.5px]">
                <div>
                  <span className="font-bold text-red-400">- </span>
                  <span className="text-red-300/80">router.post(&apos;/search&apos;, handler)</span>
                </div>
                <div>
                  <span className="font-bold text-green-400">+ </span>
                  <span className="text-green-300/80">router.post(&apos;/search&apos;, rateLimit(&#123; max:20, window:60 &#125;), handler)</span>
                </div>
                <Badge n="3" />
              </div>

              {/* ④ approval */}
              <div className="relative pr-10 text-white/55">
                <span className="font-bold text-white/80">[y]</span> apply
                <span className="mx-1.5 text-white/20">·</span>
                <span className="font-bold text-white/80">[n]</span> skip
                <span className="mx-1.5 text-white/20">·</span>
                <span className="font-bold text-white/80">[a]</span> apply all
                <span className="mx-1.5 text-white/20">·</span>
                <span className="font-bold text-white/80">[e]</span> edit
                <Badge n="4" />
              </div>

              {/* thinking */}
              <div className="text-white/35">
                <span className="animate-pulse font-bold text-coral">ℳ </span>
                <span className="font-bold text-coral">Thinking</span>
                <span className="text-white/25"> … (3s · ↓2.1k tokens · esc to interrupt)</span>
              </div>
            </div>

            {/* ⑤ composer */}
            <div className="relative rounded-b-2xl border-t border-coral/30 px-5 py-3 pr-10">
              <div className="flex items-center gap-2">
                <span className="font-bold text-coral">▸▸</span>
                <span className="text-white/70">also add a test for the rate-limiter</span>
                <span className="inline-block h-4 w-1.5 animate-pulse bg-coral" aria-hidden />
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-white/25">
                <span>enter send · / cmd · @ file · shift+tab mode</span>
                <span className="font-bold text-green-400">manual</span>
              </div>
              <Badge n="5" />
            </div>
          </div>
        </div>
      </div>

      {/* callout legend — title + description cards */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {CALLOUTS.map((c) => (
          <div
            key={c.n}
            className="flex flex-col gap-1.5 rounded-xl border border-ink/8 bg-white/50 px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white">
                {c.n}
              </span>
              <span className="text-[13px] font-semibold text-ink">{c.title}</span>
            </div>
            <p className="text-[11.5px] leading-relaxed text-ink/50">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Badge({ n }: { n: string }) {
  return (
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white">
      {n}
    </span>
  );
}
