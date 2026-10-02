import Image from 'next/image';
import { ArrowDownToLine, BadgeCheck, Globe, History, MessagesSquare, RefreshCw } from 'lucide-react';
import { DownloadButton } from './DownloadButton';
import { DESKTOP_CHANNEL } from '@/lib/download';

/**
 * "Mira for Mac": the desktop app, sold with real screenshots of it.
 *
 * Shots are captured from the shipped app (1280×782 windows, native
 * corners, no shadow — the drop shadow is drawn here so it sits on the
 * cream page). Anything private in them was blurred before export.
 */
const ROWS = [
  {
    eyebrow: 'One picker',
    title: 'Your agents and your models, side by side.',
    body: 'Claude Code, Codex, Cursor and more run inside Mira on your own plan — next to Anthropic, OpenRouter, Groq or a local Ollama on your own key. Switch per chat, even mid-conversation.',
    src: '/app/models.webp',
    alt: 'Mira’s model picker listing providers and external agents, with Claude Code selected',
  },
  {
    eyebrow: 'Command palette',
    title: 'Everything is ⌘K away.',
    body: 'New chats, folders, models and agents, the context window, reviews, and every setting — type a few letters and go. Every shortcut is yours to rebind.',
    src: '/app/palette.webp',
    alt: 'Mira’s ⌘K command palette open over a chat',
  },
  {
    eyebrow: 'Usage',
    title: 'Know what every chat costs.',
    body: 'Spend, tokens and sessions by day, model and project — including what Claude Code and Codex report. Export it as CSV whenever you need it.',
    src: '/app/usage.webp',
    alt: 'Mira’s usage dashboard with total spend, a cost-per-day chart and a breakdown by model',
  },
];

const FACTS = [
  { Icon: History, title: 'Bring your chats', body: 'Import Claude Code and Codex history; pick up where you left off.' },
  { Icon: Globe, title: 'Its own browser', body: 'Agents browse in a live pane you can watch and take over.' },
  { Icon: MessagesSquare, title: 'Checkpoints', body: 'Every message snapshots your files. Restore — and undo the restore.' },
  { Icon: RefreshCw, title: 'Updates itself', body: 'A green button says when there’s more. One click and you’re on it.' },
];

function Shot({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1280}
      height={782}
      priority={priority}
      sizes="(min-width: 1152px) 1100px, 100vw"
      className="h-auto w-full drop-shadow-[0_30px_60px_rgba(28,25,40,0.28)]"
    />
  );
}

export function DesktopApp() {
  return (
    <section id="desktop" aria-labelledby="desktop-title" className="relative overflow-hidden bg-cream pb-28 pt-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-40 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-coral-soft/30 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-coral">Mira for Mac</div>
          <h2
            id="desktop-title"
            className="mt-4 text-balance font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl"
          >
            Every agent you use, in <span className="italic text-coral">one</span> native app.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">
            Claude Code and Codex, your own models, a browser your agents can drive, and every chat you&apos;ve ever had
            — in a fast, native Mac window.
          </p>
          <div className="mt-8">
            <DownloadButton center />
          </div>
        </div>

        {/* The app */}
        <figure className="relative mt-16">
          <Shot
            src="/app/hero.webp"
            alt="Mira for Mac: Claude Code opens the runmira/mira repository in Mira’s own browser, shown live in a pane beside the chat"
            priority
          />
          <figcaption className="pointer-events-none absolute -bottom-5 right-6 hidden items-center gap-2 rounded-full border border-ink/10 bg-white/85 px-4 py-2 text-[12px] font-medium text-ink/70 shadow-lg shadow-ink/10 backdrop-blur md:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Claude Code driving Mira&apos;s browser, live
          </figcaption>
        </figure>

        {/* Feature rows */}
        <div className="mt-32 flex flex-col gap-28">
          {ROWS.map((row, i) => (
            <div key={row.src} className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
              <div className={i % 2 ? 'md:order-2 md:col-span-4' : 'md:col-span-4'}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-coral">{row.eyebrow}</div>
                <h3 className="mt-3 text-balance font-heading text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
                  {row.title}
                </h3>
                <p className="mt-4 leading-relaxed text-ink/65">{row.body}</p>
              </div>
              <div className={i % 2 ? 'md:order-1 md:col-span-8' : 'md:col-span-8'}>
                <Shot src={row.src} alt={row.alt} />
              </div>
            </div>
          ))}
        </div>

        {/* Facts */}
        <div className="mt-28 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-3xl border border-ink/8 bg-white/60 p-6 backdrop-blur-sm">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-coral/12 text-coral">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div className="mt-4 font-heading text-lg font-semibold tracking-[-0.01em] text-ink">{title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{body}</p>
            </div>
          ))}
        </div>

        {/* Closing call */}
        <div className="mt-20 flex flex-col items-center gap-4 rounded-[2rem] bg-obsidian px-8 py-14 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-coral text-white shadow-lg shadow-coral/30">
            <ArrowDownToLine className="h-6 w-6" strokeWidth={2.5} aria-hidden />
          </div>
          <div className="text-balance font-heading text-3xl font-semibold tracking-[-0.02em] text-ghost sm:text-4xl">
            Get Mira for Mac{DESKTOP_CHANNEL === 'alpha' ? ' — Alpha' : DESKTOP_CHANNEL === 'beta' ? ' — Beta' : ''}
          </div>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-ghost/60">
            <span>36 MB</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <BadgeCheck className="h-4 w-4 text-emerald-400" aria-hidden /> Signed &amp; notarized by Apple
            </span>
            <span aria-hidden>·</span>
            <span>Free and open source</span>
          </p>
          <div className="mt-2">
            <DownloadButton center onDark />
          </div>
        </div>
      </div>
    </section>
  );
}
