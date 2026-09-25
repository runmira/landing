export function Footer() {
  return (
    <footer className="bg-cream">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="hairline" />
        <div className="flex flex-col items-start gap-6 py-10 text-sm text-ink/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold text-coral">ℳ</span>
            <span className="font-semibold text-ink">mira</span>
            <span className="text-ink/40">
              · Apache-2.0 · Built in the open
            </span>
          </div>
          <nav className="flex flex-wrap gap-6 text-[13px] font-medium">
            <a
              href="https://github.com/runmira/mira"
              className="text-ink/60 transition-colors hover:text-ink"
            >
              GitHub
            </a>
            <a
              href="/releases"
              className="text-ink/60 transition-colors hover:text-ink"
            >
              Releases
            </a>
            <a
              href="https://github.com/runmira/mira/issues"
              className="text-ink/60 transition-colors hover:text-ink"
            >
              Issues
            </a>
            <a
              href="/docs"
              className="text-ink/60 transition-colors hover:text-ink"
            >
              Docs
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
