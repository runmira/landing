import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Tag } from 'lucide-react';
import { getReleases, type Release } from '@/lib/releases';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Releases · Mira',
  description: "What ships in Mira, version by version. Full changelog for every release.",
  openGraph: {
    title: 'Releases · Mira',
    description: "What ships in Mira, version by version.",
    url: 'https://runmira.com/releases',
  },
};

export default async function ReleasesPage() {
  const releases = await getReleases();

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="border-b border-ink/8 bg-cream/75 backdrop-blur-xl supports-[backdrop-filter]:bg-cream/60">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-12">
            <Link href="/" className="group flex items-center gap-2.5">
              <Image src="/mira-logo.png" alt="" width={36} height={36} priority className="h-9 w-9 rounded-[10px] object-contain drop-shadow-[0_4px_14px_rgba(92,108,220,0.35)]" />
              <span className="font-heading text-[17px] font-semibold tracking-[-0.01em] text-ink">mira</span>
            </Link>
            <nav className="hidden items-center gap-8 md:flex">
              <Link href="/" className="group relative text-[13px] font-medium text-ink/60 transition-colors hover:text-ink">
                Home
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-coral transition-all duration-200 group-hover:w-full" />
              </Link>
              <Link href="/docs" className="group relative text-[13px] font-medium text-ink/60 transition-colors hover:text-ink">
                Docs
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-coral transition-all duration-200 group-hover:w-full" />
              </Link>
              <Link href="/releases" className="group relative text-[13px] font-medium text-ink transition-colors">
                Releases
                <span className="absolute -bottom-1 left-0 h-px w-full bg-coral" />
              </Link>
            </nav>
            <a
              href="https://github.com/runmira/mira"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-obsidian px-4 py-2 text-[12px] font-semibold text-ghost shadow-md shadow-coral/15 transition-all duration-200 hover:shadow-lg hover:shadow-coral/25 active:scale-95"
            >
              <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-current">
                <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.74 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.26 5.69.41.35.78 1.05.78 2.12v3.14c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              Star on GitHub
            </a>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-coral/40 to-transparent" />
      </header>

      <main className="flex-1 pt-16">
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-ink/6 bg-gradient-to-b from-white/60 to-cream py-20">
          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle, hsl(222 30% 12% / 0.08) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="relative mx-auto max-w-3xl px-6 md:px-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-coral/20 bg-coral/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-coral/80">
              <Tag size={10} />
              Changelog
            </div>
            <h1 className="text-[2.75rem] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
              Releases
            </h1>
            <p className="mt-3 text-[17px] leading-relaxed text-ink/55">
              What ships in Mira, version by version.
            </p>
          </div>
        </div>

        {/* Release list */}
        <div className="mx-auto max-w-3xl px-6 py-16 md:px-12">
          {releases.length === 0 ? (
            <p className="text-center text-ink/40">No releases found.</p>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[11px] top-6 bottom-6 w-px bg-gradient-to-b from-coral/50 via-ink/10 to-transparent" />

              <div className="flex flex-col gap-10">
                {releases.map((release, i) => (
                  <ReleaseCard key={release.slug} release={release} isLatest={i === 0} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

const MAX_FEATURES = 6;

function ReleaseCard({ release, isLatest }: { release: Release; isLatest: boolean }) {
  const shown = release.features.slice(0, MAX_FEATURES);
  const overflow = release.features.length - MAX_FEATURES;

  return (
    <div className="flex gap-6">
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <div
          className={[
            'mt-5 flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-full ring-4 ring-cream',
            isLatest
              ? 'bg-coral shadow-[0_0_12px_3px_hsl(12_80%_68%/0.35)]'
              : 'bg-ink/15',
          ].join(' ')}
        >
          {isLatest && <span className="h-2 w-2 rounded-full bg-white" />}
        </div>
      </div>

      {/* Card — div so the button CTA can be a proper <a> inside */}
      <div className="flex-1 overflow-hidden rounded-2xl border border-ink/8 bg-white/70 p-6 shadow-sm transition-all hover:border-coral/20 hover:shadow-md hover:shadow-coral/8">
        {/* Version + badges */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={[
              'inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold tracking-wider',
              isLatest ? 'bg-coral text-white' : 'bg-ink/6 text-ink/60',
            ].join(' ')}
          >
            v{release.version}
          </span>
          {isLatest && (
            <span className="rounded-full border border-coral/25 bg-coral/8 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-coral">
              Latest
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="mb-1.5 text-[18px] font-bold leading-snug tracking-[-0.02em] text-ink">
          {release.title}
        </h2>

        {/* Headline */}
        {release.headline && (
          <p className="mb-5 text-[14px] leading-relaxed text-ink/50 line-clamp-2">
            {release.headline}
          </p>
        )}

        {/* Feature list */}
        {shown.length > 0 && (
          <ul className="mb-2 space-y-2">
            {shown.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-ink/70">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-coral/60" />
                {f}
              </li>
            ))}
            {overflow > 0 && (
              <li className="flex items-center gap-2.5 text-[13px] text-ink/35">
                <span className="ml-[3px] font-mono">···</span>
                {overflow} more in the full changelog
              </li>
            )}
          </ul>
        )}

        {/* Divider */}
        <div className="my-5 hairline" />

        {/* CTA button */}
        <Link
          href={`/releases/${release.slug}`}
          className="inline-flex items-center gap-2 rounded-full bg-obsidian px-4 py-2 text-[12.5px] font-semibold text-ghost shadow-sm transition-all hover:shadow-md hover:shadow-coral/20 active:scale-95"
        >
          See full changelog
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
