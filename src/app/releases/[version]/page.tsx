import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { getReleases, getRelease } from '@/lib/releases';
import { ReleaseContent } from '@/components/ReleaseContent';
import { Footer } from '@/components/Footer';

export async function generateStaticParams() {
  const releases = await getReleases();
  return releases.map((r) => ({ version: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ version: string }> }): Promise<Metadata> {
  const { version } = await params;
  const release = await getRelease(version);
  if (!release) return { title: 'Release · Mira' };
  return {
    title: `${release.slug} · Mira Releases`,
    description: release.headline || `Mira ${release.slug} release notes.`,
    openGraph: {
      title: `${release.slug} · Mira Releases`,
      description: release.headline,
      url: `https://runmira.com/releases/${release.slug}`,
    },
  };
}

export default async function ReleasePage({ params }: { params: Promise<{ version: string }> }) {
  const { version } = await params;
  const releases = await getReleases();
  const idx = releases.findIndex((r) => r.slug === version);
  const release = releases[idx];

  if (!release) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream">
        <p className="text-ink/50">Release not found.</p>
        <Link href="/releases" className="mt-4 text-coral hover:underline">← All releases</Link>
      </div>
    );
  }

  const prev = releases[idx + 1] ?? null; // older
  const next = releases[idx - 1] ?? null; // newer
  const isLatest = idx === 0;

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
        {/* Back breadcrumb + hero */}
        <div className="relative overflow-hidden border-b border-ink/6 bg-gradient-to-b from-white/60 to-cream">
          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle, hsl(222 30% 12% / 0.08) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="relative mx-auto max-w-3xl px-6 py-14 md:px-12">
            {/* Breadcrumb */}
            <Link
              href="/releases"
              className="mb-8 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink/45 transition-colors hover:text-ink"
            >
              <ArrowLeft size={13} />
              All releases
            </Link>

            {/* Version + badges */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center rounded-full bg-obsidian px-3 py-1 font-mono text-[13px] font-bold tracking-wider text-ghost">
                v{release.version}
              </span>
              {isLatest && (
                <span className="rounded-full border border-coral/25 bg-coral/8 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-coral">
                  Latest
                </span>
              )}
              <a
                href={`https://github.com/runmira/mira/releases/tag/v${release.version}`}
                target="_blank"
                rel="noreferrer"
                className="ml-auto text-[12px] font-medium text-ink/40 transition-colors hover:text-ink"
              >
                GitHub release ↗
              </a>
            </div>

            {/* Title */}
            <h1 className="mt-4 text-[2.4rem] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
              {release.title}
            </h1>

            {/* Headline paragraph */}
            {release.headline && (
              <p className="mt-3 text-[16px] leading-relaxed text-ink/55">
                {release.headline}
              </p>
            )}

            {/* Feature tags */}
            {release.features.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {release.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-ink/10 bg-ink/[0.04] px-3 py-0.5 text-[12px] text-ink/60"
                  >
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-6 py-12 md:px-12">
          <ReleaseContent content={release.content} />

          {/* Prev / Next */}
          <div className="mt-16 border-t border-ink/8 pt-10 flex items-stretch gap-3">
            {next ? (
              <NavCard direction="newer" slug={next.slug} label={`v${next.version}`} />
            ) : <div className="flex-1" />}
            {prev ? (
              <NavCard direction="older" slug={prev.slug} label={`v${prev.version}`} />
            ) : <div className="flex-1" />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function NavCard({ direction, slug, label }: { direction: 'newer' | 'older'; slug: string; label: string }) {
  const isNewer = direction === 'newer';
  return (
    <Link
      href={`/releases/${slug}`}
      className={[
        'group flex flex-1 items-center gap-3 rounded-2xl border border-ink/10 bg-white/70 px-5 py-4',
        'transition-all hover:border-coral/30 hover:bg-white hover:shadow-sm',
        !isNewer ? 'flex-row-reverse' : '',
      ].join(' ')}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink/35 transition-colors group-hover:bg-coral/10 group-hover:text-coral">
        {isNewer ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </span>
      <div className={isNewer ? '' : 'text-right'}>
        <div className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
          {isNewer ? 'Newer' : 'Older'}
        </div>
        <div className="font-mono text-[13px] font-semibold text-ink transition-colors group-hover:text-coral">
          {label}
        </div>
      </div>
    </Link>
  );
}
