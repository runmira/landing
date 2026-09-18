import type { ReactNode } from 'react';

const MANIFESTO = [
  {
    n: '01',
    title: 'You own the whole thing.',
    body: 'Your key, your model, your machine. Sessions and configuration live as plain files on disk. No hosted control plane. No vector database. No telemetry.',
  },
  {
    n: '02',
    title: 'A harness, not a prompt.',
    body: 'Tools, permissions, history, and subagents are shared infrastructure — not scaffolding you rebuild per agent. New capabilities are additions on top of the loop.',
  },
  {
    n: '03',
    title: 'Safety is a policy layer.',
    body: 'A small DSL — Bash(cargo test:*), Edit(src/**) — decides what the model may do without asking, what needs approval, and what is off-limits.',
  },
];

/**
 * Every "In the box" cell is a small pixel-approximation of what the
 * feature actually renders in the Mira TUI — same coral header dots,
 * same mist file paths, same diff colors as {@link ./TerminalDemo}.
 * Kept intentionally low-fidelity: 3–6 rows, no interactivity, so the
 * grid reads as a spec sheet, not a slideshow.
 */
type BoxItem = {
  title: string;
  caption: string;
  demo: ReactNode;
};

// Reusable atoms so each demo cell stays short and obviously terminal-shaped.
const Row = ({ children }: { children: ReactNode }) => (
  <div className="whitespace-pre">{children}</div>
);
const Dot = () => <span className="font-bold text-green-500">● </span>;
const Prompt = () => <span className="font-bold text-coral">&gt; </span>;
const Ghost = ({ children }: { children: ReactNode }) => (
  <span className="text-ghost">{children}</span>
);
const Dim = ({ children }: { children: ReactNode }) => (
  <span className="text-mist/55">{children}</span>
);
const Coral = ({ children }: { children: ReactNode }) => (
  <span className="font-bold text-coral">{children}</span>
);

const IN_THE_BOX: BoxItem[] = [
  {
    title: 'Chat + streaming tool use',
    caption: 'Tokens land as they arrive; tool calls stream inline.',
    demo: (
      <>
        <Row>
          <Prompt />
          <Ghost>list the API routes in this repo</Ghost>
        </Row>
        <Row>
          <Dot />
          <Coral>Grep</Coral> <Ghost>route\\(</Ghost>{' '}
          <Dim>· 14 files · streaming…</Dim>
        </Row>
        <Row>
          <Dim>└ </Dim>src/routes/auth.ts
        </Row>
        <Row>
          <Dim>└ </Dim>src/routes/billing.ts
        </Row>
        <Row>
          <span className="animate-pulse-logo font-bold text-coral">ℳ </span>
          <Coral>Thinking</Coral>
          <Dim> … (0.4s · ↓210 tokens)</Dim>
        </Row>
      </>
    ),
  },
  {
    title: 'Plan / Manual / Auto / Edit / Yolo modes',
    caption: 'Shift+Tab cycles the permission budget for the loop.',
    demo: (
      <>
        <Row>
          <Dim>mode · shift+tab to cycle</Dim>
        </Row>
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="rounded-full bg-blue-500/15 px-2 py-0.5 font-bold text-blue-400">
            plan
          </span>
          <span className="rounded-full bg-green-500/15 px-2 py-0.5 font-bold text-green-400">
            manual
          </span>
          <span className="rounded-full bg-yellow-500/15 px-2 py-0.5 font-bold text-yellow-400">
            auto
          </span>
          <span className="rounded-full bg-amber-300/15 px-2 py-0.5 font-bold text-amber-300">
            edit
          </span>
          <span className="rounded-full bg-red-500/15 px-2 py-0.5 font-bold text-red-400">
            yolo
          </span>
        </div>
        <Row>
          <Dim>current: </Dim>
          <span className="font-bold text-green-500">manual</span>
          <Dim> · asks on writes</Dim>
        </Row>
      </>
    ),
  },
  {
    title: 'Inline diff approvals',
    caption: 'Every write is a proposed patch you accept per hunk.',
    demo: (
      <>
        <Row>
          <Dot />
          <Coral>Edit </Coral>
          <Ghost>src/auth.ts</Ghost>
          <span className="ml-2 font-bold text-green-500">+2</span>
          <span className="font-bold text-red-500"> -1</span>
        </Row>
        <Row>
          <span className="font-bold text-red-500">- </span>
          <span className="text-red-400">httpOnly: false,</span>
        </Row>
        <Row>
          <span className="font-bold text-green-500">+ </span>
          <span className="text-green-400">httpOnly: true,</span>
        </Row>
        <Row>
          <span className="font-bold text-green-500">+ </span>
          <span className="text-green-400">secure: true,</span>
        </Row>
        <Row>
          <Dim>[y]</Dim> apply · <Dim>[n]</Dim> skip · <Dim>[a]</Dim> apply all
        </Row>
      </>
    ),
  },
  {
    title: 'Subagents on isolated worktrees',
    caption: 'Spawn a parallel agent on a scratch branch, discard freely.',
    demo: (
      <>
        <Row>
          <Dot />
          <Coral>Spawn </Coral>
          <Ghost>review-agent</Ghost>
          <Dim> · ⎇ wt-42a1</Dim>
        </Row>
        <Row>
          <Dim>└ </Dim>.mira/worktrees/wt-42a1
        </Row>
        <Row>
          <Dot />
          <Ghost>Reading 6 files </Ghost>
          <Dim>· isolated</Dim>
        </Row>
        <Row>
          <span className="animate-pulse-logo font-bold text-coral">ℳ </span>
          <Coral>review-agent</Coral>
          <Dim> · returns 4 findings</Dim>
        </Row>
      </>
    ),
  },
  {
    title: 'Persistent memory as markdown',
    caption: 'What Mira remembers is a folder you can grep.',
    demo: (
      <>
        <Row>
          <Dot />
          <Coral>Write </Coral>
          <Ghost>.mira/memory/project_ship_date.md</Ghost>
        </Row>
        <Row>
          <Dim>---</Dim>
        </Row>
        <Row>
          <Dim>type: </Dim>
          <Ghost>project</Ghost>
        </Row>
        <Row>
          <Dim>---</Dim>
        </Row>
        <Row>
          <Ghost>freeze begins 2026-03-05</Ghost>
        </Row>
      </>
    ),
  },
  {
    title: 'One-key undo of file writes',
    caption: 'Every apply is journaled. u rewinds the last one.',
    demo: (
      <>
        <Row>
          <Dot />
          <Coral>Edit </Coral>
          <Ghost>src/index.ts</Ghost>
          <Dim> · applied</Dim>
        </Row>
        <Row>
          <Dim>└ .mira/.undo/2026-09-18T14-02-33.patch</Dim>
        </Row>
        <Row>
          <span className="font-bold text-coral">u</span>{' '}
          <Ghost>↶ undo last write</Ghost>
        </Row>
        <Row>
          <Dot />
          <Ghost>reverted 1 file · working tree clean</Ghost>
        </Row>
      </>
    ),
  },
  {
    title: 'MCP server support',
    caption: 'Any MCP tool shows up as first-class in the loop.',
    demo: (
      <>
        <Row>
          <Dim>~/.mira/mcp/</Dim>
          <Ghost>linear.json</Ghost>
          <Dim> · </Dim>
          <Ghost>github.json</Ghost>
        </Row>
        <Row>
          <Dot />
          <Coral>mcp </Coral>
          <Ghost>linear.search</Ghost>
          <Dim>(&quot;INGEST bugs&quot;)</Dim>
        </Row>
        <Row>
          <Dim>└ </Dim>3 open · P0 count=1
        </Row>
      </>
    ),
  },
  {
    title: 'Skills from SKILL.md files',
    caption: 'A directory of prompts becomes a slash command.',
    demo: (
      <>
        <Row>
          <Prompt />
          <Ghost>/review</Ghost>
        </Row>
        <Row>
          <Dot />
          <Coral>Skill </Coral>
          <Ghost>code-review</Ghost>
          <Dim> · from SKILL.md</Dim>
        </Row>
        <Row>
          <Dim>└ .mira/skills/code-review/SKILL.md</Dim>
        </Row>
        <Row>
          <Dim>└ effort=medium · comment=false</Dim>
        </Row>
      </>
    ),
  },
  {
    title: 'Terminal + browser front-ends',
    caption: 'Same session, TUI or localhost — pick per moment.',
    demo: (
      <>
        <Row>
          <Prompt />
          <Ghost>mira serve</Ghost>
        </Row>
        <Row>
          <Dot />
          <Ghost>listening on </Ghost>
          <Coral>http://127.0.0.1:4747</Coral>
        </Row>
        <Row>
          <Dim>└ tui attached · browser attached</Dim>
        </Row>
        <Row>
          <Dim>ctrl+c to detach</Dim>
        </Row>
      </>
    ),
  },
  {
    title: 'Pull-request review agent',
    caption: 'One command drops inline comments on a PR.',
    demo: (
      <>
        <Row>
          <Prompt />
          <Ghost>/review </Ghost>
          <Coral>#412</Coral>
        </Row>
        <Row>
          <Dot />
          <Coral>Fetching </Coral>
          <Ghost>runmira/mira#412</Ghost>
        </Row>
        <Row>
          <Dim>└ 18 files · +324 -87</Dim>
        </Row>
        <Row>
          <Dot />
          <Ghost>posted </Ghost>
          <span className="font-bold text-green-500">6</span>
          <Ghost> inline comments</Ghost>
        </Row>
      </>
    ),
  },
  {
    title: 'Session persistence + resume',
    caption: 'Close the terminal, pick it back up tomorrow.',
    demo: (
      <>
        <Row>
          <Dim>~/.mira/sessions/</Dim>
        </Row>
        <Row>
          <Dim>└ </Dim>
          <Ghost>2026-09-18-httponly-cookies.jsonl</Ghost>
        </Row>
        <Row>
          <Prompt />
          <Ghost>mira --resume</Ghost>
        </Row>
        <Row>
          <Dot />
          <Ghost>restored 47 turns · ↑12.3k ↓4.1k</Ghost>
        </Row>
      </>
    ),
  },
  {
    title: 'Ripgrep, glob, patch tools',
    caption: 'The plumbing an editor already assumes.',
    demo: (
      <>
        <Row>
          <Dot />
          <Coral>Grep </Coral>
          <Ghost>&quot;TODO&quot;</Ghost>
          <Dim> · rg -n</Dim>
        </Row>
        <Row>
          <Dim>└ </Dim>src/lib/auth.ts:42
        </Row>
        <Row>
          <Dot />
          <Coral>Glob </Coral>
          <Ghost>&quot;**/*.rs&quot;</Ghost>
          <Dim> · 137 files</Dim>
        </Row>
        <Row>
          <Dot />
          <Coral>Patch </Coral>
          <Ghost>src/main.rs</Ghost>
          <Dim> · +1 -0</Dim>
        </Row>
      </>
    ),
  },
];

export function Features() {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden bg-cream pb-28 pt-8"
    >
      {/* Warm ambient — same family as Hero's coral glows, just quieter
          so the section reads as the next room in the same house. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-coral-soft/30 blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        {/* Section eyebrow — mirrors the Hero status pill's uppercase micro-cap */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            Manifesto
          </div>
          <h2 className="text-balance font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.025em] text-ink sm:text-5xl md:text-6xl">
            Three ideas <span className="italic text-coral">shape</span> it.
          </h2>
        </div>

        {/* Numbered manifesto — editorial two-column with a heavy number
            in front, no card box. Hairline dividers so the ink stays quiet. */}
        <div className="mt-16 space-y-14">
          {MANIFESTO.map((m) => (
            <div key={m.n}>
              <div className="hairline mb-10" />
              <div className="grid gap-8 sm:grid-cols-12">
                <div className="sm:col-span-3">
                  <div className="font-mono text-5xl font-semibold text-coral/70 sm:text-6xl">
                    {m.n}
                  </div>
                </div>
                <div className="sm:col-span-9">
                  <h3 className="font-heading text-2xl font-semibold tracking-[-0.01em] text-ink sm:text-3xl">
                    {m.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
                    {m.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="hairline" />
        </div>

        {/* In the box — every capability has a hand-rendered TUI preview */}
        <div className="mt-24">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-coral" />
              In the box
            </div>
            <h3 className="font-heading text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
              Every piece is a real{' '}
              <span className="italic text-coral">product surface</span>.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/60">
              Each cell is a pixel-approximation of what you actually see when
              the feature runs — same colors, same characters.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {IN_THE_BOX.map((item) => (
              <article
                key={item.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/50 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-white/80"
              >
                <div className="relative overflow-hidden rounded-t-2xl border-b border-white/10 bg-obsidian/95">
                  {/* Title bar — three dots, same as TerminalDemo */}
                  <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500/70" />
                    <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
                    <span className="h-2 w-2 rounded-full bg-green-500/70" />
                    <span className="ml-2 font-mono text-[10px] text-mist/40">
                      ~ mira
                    </span>
                  </div>
                  <div className="min-h-[7.5rem] space-y-1 px-4 py-3 font-mono text-[11px] leading-[1.55] text-ghost">
                    {item.demo}
                  </div>
                </div>
                <div className="flex-1 px-5 py-4">
                  <h4 className="text-[15px] font-semibold text-ink">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-[13px] leading-snug text-ink/60">
                    {item.caption}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Closing beat — sends the reader back up to the live terminal
              specimen so they don't drift out of the section into the
              providers marquee cold. */}
          <div className="mt-14 flex justify-center">
            <a
              href="#terminal"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-6 py-3 text-sm font-semibold text-ink backdrop-blur-sm transition-all duration-200 hover:border-ink/30 hover:bg-white active:scale-95"
            >
              See it in the terminal
              <span
                aria-hidden
                className="text-coral transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
