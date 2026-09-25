import { InstallCommand } from "./InstallCommand";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Warm ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-coral-soft/40 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-40 h-72 w-72 rounded-full bg-coral/15 blur-[90px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-36 sm:pt-44 md:px-12">
        <div className="max-w-4xl">
          {/* Status pill — capsule */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            v0.4.0 — alpha, in the open
          </div>

          {/* Headline */}
          <h1 className="text-balance font-heading text-5xl font-semibold leading-[0.98] tracking-[-0.03em] text-ink sm:text-7xl md:text-[84px]">
            A coding agent
            <br />
            you actually <span className="italic text-coral">own</span>.
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/65 sm:text-xl">
            Mira reads your code, edits files, runs commands, and reviews diffs
            — from a terminal. Bring your own model. Sessions live as plain
            files on disk. No hosted control plane, no vector DB, no telemetry.
          </p>

          {/* CTAs — capsule buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
         <InstallCommand />
            <a
              href="https://github.com/runmira/mira"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/50 px-7 py-3.5 text-sm font-semibold text-ink backdrop-blur-sm transition-all duration-200 hover:border-ink/25 hover:bg-white active:scale-95"
            >
              Read the source
            </a>
          </div>

          {/* Meta strip */}
          <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-ink/40">
            <span>Apache-2.0</span>
            <span aria-hidden className="text-coral/50">·</span>
            <span>Runs on your machine</span>
            <span aria-hidden className="text-coral/50">·</span>
            <span>Any OpenAI-compatible model</span>
            <span aria-hidden className="text-coral/50">·</span>
            <span>Zero telemetry</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;