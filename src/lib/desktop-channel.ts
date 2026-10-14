import { DESKTOP_CHANNEL, type DesktopChannel } from './download';
import { getReleases } from './releases';

/**
 * The desktop channel the site offers. Resolves to the newest desktop build's
 * channel from the release notes (newest first): suffixed notes
 * (`v0.6.2-beta.1.md`) are desktop-only — the CLI only ever writes plain
 * `vX.Y.Z` notes — so the first non-stable release is the latest thing the
 * desktop workflow shipped. Falls back to DESKTOP_CHANNEL when notes can't
 * be read.
 */
export async function getDesktopChannel(): Promise<DesktopChannel> {
  try {
    const latest = (await getReleases()).find((r) => r.channel !== 'stable');
    return (latest?.channel as DesktopChannel | undefined) ?? DESKTOP_CHANNEL;
  } catch {
    return DESKTOP_CHANNEL;
  }
}
