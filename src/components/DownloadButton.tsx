import { ArrowDownToLine } from 'lucide-react';
import { DESKTOP_CHANNEL, DESKTOP_DOWNLOAD_URL, DESKTOP_REQUIREMENTS } from '@/lib/download';

/**
 * "Download for Mac": the desktop app's signed, notarized disk image, from
 * the channel the site offers (see lib/download.ts).
 *
 * `hero` is the coral capsule beside the install command, with the
 * requirements underneath; `compact` is the header's small pill.
 */
export function DownloadButton({
  variant = 'hero',
  center = false,
  onDark = false,
}: {
  variant?: 'hero' | 'compact' | 'link';
  /** Centre the button and its requirements line (section CTAs). */
  center?: boolean;
  /** On a dark surface: lighter requirements text. */
  onDark?: boolean;
}) {
  if (variant === 'link') {
    return (
      <a
        href={DESKTOP_DOWNLOAD_URL}
        className="inline-flex items-center gap-1.5 font-semibold text-coral underline-offset-4 hover:underline"
      >
        <ArrowDownToLine className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
        Download Mira for Mac{DESKTOP_CHANNEL !== 'stable' ? ` (${DESKTOP_CHANNEL})` : ''}
      </a>
    );
  }
  if (variant === 'compact') {
    return (
      <a
        href={DESKTOP_DOWNLOAD_URL}
        className="hidden items-center gap-1.5 rounded-full border border-ink/12 bg-white/60 px-3.5 py-2 text-[12px] font-semibold text-ink backdrop-blur-sm transition-all duration-200 hover:border-coral/40 hover:bg-white active:scale-95 lg:inline-flex"
      >
        <ArrowDownToLine className="h-3.5 w-3.5 text-coral" strokeWidth={2.5} aria-hidden />
        Download
      </a>
    );
  }
  return (
    <div className={`flex flex-col gap-1.5 ${center ? 'items-center' : 'items-start'}`}>
      <a
        href={DESKTOP_DOWNLOAD_URL}
        className="group inline-flex items-center gap-2.5 rounded-full bg-coral py-3.5 pl-5 pr-6 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition-all duration-200 hover:bg-coral/90 hover:shadow-xl hover:shadow-coral/40 active:scale-95"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-y-px">
          <ArrowDownToLine className="h-3.5 w-3.5" strokeWidth={2.75} aria-hidden />
        </span>
        Download for Mac
        {DESKTOP_CHANNEL !== 'stable' && (
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em]">
            {DESKTOP_CHANNEL}
          </span>
        )}
      </a>
      <span className={`text-[11px] font-medium ${center ? '' : 'pl-5'} ${onDark ? 'text-ghost/45' : 'text-ink/40'}`}>
        {DESKTOP_REQUIREMENTS}
      </span>
    </div>
  );
}
