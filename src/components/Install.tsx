import { InstallCommand } from './InstallCommand';

const VARIANTS = [
  {
    label: 'Homebrew',
    subtitle: 'macOS + Linux',
    command: 'brew install runmira/tap/mira',
  },
  {
    label: 'Install script',
    subtitle: 'no Homebrew required',
    command:
      'curl -fsSL https://raw.githubusercontent.com/runmira/mira/main/install.sh | bash',
  },
  {
    label: 'From source',
    subtitle: 'Rust 1.88+',
    command: 'cargo install --path mira/crates/mira-cli',
  },
];

export function Install() {
  return (
    <section
      id="install"
      className="relative overflow-hidden bg-cream pb-28 pt-4"
    >
      {/* Warm ambient — echoes the Hero's twin-glow layout so the page's
          last real section closes the same room it opened in. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-coral-soft/35 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-10 h-72 w-72 rounded-full bg-coral/12 blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            Install
          </div>
          <h2 className="text-balance font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.025em] text-ink sm:text-5xl md:text-6xl">
            One command. Then it&apos;s <span className="italic text-coral">yours</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
            Everything after this line is a file on your disk.
          </p>
        </div>

        <div className="mx-auto mt-12 flex justify-center">
          <InstallCommand />
        </div>

        <div className="mt-16 grid gap-3 sm:grid-cols-3">
          {VARIANTS.map((v) => (
            <div
              key={v.label}
              className="rounded-3xl border border-ink/10 bg-white/60 p-6 backdrop-blur-sm transition hover:border-ink/25 hover:bg-white/80"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-ink">
                  {v.label}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink/45">
                  {v.subtitle}
                </span>
              </div>
              <div className="mt-4 overflow-x-auto rounded-2xl bg-obsidian/95 p-4 font-mono text-xs leading-relaxed text-ghost">
                <span className="font-bold text-coral">$ </span>
                {v.command}
              </div>
            </div>
          ))}
        </div>

        {/* Coda — closes the loop: install then run. Kept intentionally
            small so it reads as an afterthought, not a fourth variant. */}
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/40">
            Then, in any repo
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-obsidian/95 px-5 py-2.5 font-mono text-sm text-ghost shadow-md shadow-coral/10">
            <span className="font-bold text-coral">$</span>
            <span>mira</span>
            <span
              className="animate-caret ml-1 inline-block h-4 w-1.5 bg-coral"
              aria-hidden
            />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/55">
            Mira picks up the git root, loads your policy, and drops you in
            with the last session.
          </p>
        </div>

        {/* Repeat the primary CTA at the bottom so long scrollers have a
            fresh grab handle without scrolling back to the hero. */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/runmira/mira"
            className="inline-flex items-center gap-2 rounded-full bg-obsidian px-7 py-3.5 text-sm font-semibold text-ghost shadow-lg shadow-coral/15 transition-all duration-200 hover:shadow-xl hover:shadow-coral/25 active:scale-95"
          >
            Read the source
            <span aria-hidden>→</span>
          </a>
          <a
            href="https://github.com/runmira/mira/releases"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/50 px-7 py-3.5 text-sm font-semibold text-ink backdrop-blur-sm transition-all duration-200 hover:border-ink/25 hover:bg-white active:scale-95"
          >
            Download binary
          </a>
        </div>
      </div>
    </section>
  );
}

export default Install;
