import Image from 'next/image';
import Link from 'next/link';


const NAV_ITEMS = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Terminal', href: '#terminal' },
  { label: 'Providers', href: '#providers' },
  { label: 'Install', href: '#install' },
  { label: 'Releases', href: '/releases', external: false },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Warm frosted bar — same paper palette as Hero, hairline foot in
          ink so the fixed rail settles onto the cream page without a
          brutal edge. */}
      <div className="border-b border-ink/8 bg-cream/75 backdrop-blur-xl supports-[backdrop-filter]:bg-cream/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-12">
          {/* Wordmark + real app logo */}
          <a
            href="/"
            aria-label="Mira home"
            className="group flex items-center gap-2.5"
          >
            <span className="relative flex h-9 w-9 items-center justify-center">
              <Image
                src="/mira-logo.png"
                alt=""
                width={36}
                height={36}
                priority
                className="h-9 w-9 rounded-[10px] object-contain drop-shadow-[0_4px_14px_rgba(92,108,220,0.35)]"
              />
            </span>
            <span className="font-heading text-[17px] font-semibold tracking-[-0.01em] text-ink">
              mira
            </span>
            <span className="ml-1 hidden rounded-full border border-ink/10 bg-white/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/55 backdrop-blur-sm sm:inline-flex">
              v0.4.0
            </span>
          </a>

          {/* Center nav — editorial, quiet ink type */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative text-[13px] font-medium text-ink/60 transition-colors hover:text-ink"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-coral transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
            <Link
              href="/docs"
              className="group relative text-[13px] font-medium text-ink/60 transition-colors hover:text-ink"
            >
              Docs
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-coral transition-all duration-200 group-hover:w-full" />
            </Link>
          </nav>

          {/* Right cluster — same obsidian capsule vocabulary as InstallCommand */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/runmira/mira"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-obsidian px-4 py-2 text-[12px] font-semibold text-ghost shadow-md shadow-coral/15 transition-all duration-200 hover:shadow-lg hover:shadow-coral/25 active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="h-3.5 w-3.5 fill-current"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.74 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.26 5.69.41.35.78 1.05.78 2.12v3.14c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Coral hairline — a two-pixel warm accent that ties the header
          to the coral used in the Hero headline and status pills. */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-coral/40 to-transparent" />
    </header>
  );
}

export default Header;
