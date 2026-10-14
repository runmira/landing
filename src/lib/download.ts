/**
 * The Mira desktop app's download. The desktop release workflow keeps each
 * channel's latest build at a fixed name in runmira/mira's
 * `desktop-updates` release (Mira-arm64.dmg, Mira-beta-arm64.dmg,
 * Mira-alpha-arm64.dmg), so links never need a version bump.
 *
 * The offered channel is dynamic: `getDesktopChannel()` resolves the newest
 * desktop build from the release notes (see lib/desktop-channel.ts), so the
 * button follows alpha → beta without a code change. `DESKTOP_CHANNEL` below
 * is only the fallback when notes can't be read — flip it to 'stable' once
 * the desktop ships a stable build.
 */
export type DesktopChannel = 'alpha' | 'beta' | 'stable';
export const DESKTOP_CHANNEL = 'beta' as DesktopChannel;

const FEED = 'https://github.com/runmira/mira/releases/download/desktop-updates';

export function desktopDownloadUrl(channel: DesktopChannel): string {
  return channel === 'stable' ? `${FEED}/Mira-arm64.dmg` : `${FEED}/Mira-${channel}-arm64.dmg`;
}

export function desktopRequirements(channel: DesktopChannel): string {
  return channel === 'stable'
    ? 'macOS 11+ · Apple silicon'
    : `${channel === 'alpha' ? 'Alpha' : 'Beta'} · macOS 11+ · Apple silicon · updates itself`;
}

/** Fallback statics for anything that can't await the resolver. */
export const DESKTOP_DOWNLOAD_URL = desktopDownloadUrl(DESKTOP_CHANNEL);

export const DESKTOP_REQUIREMENTS = desktopRequirements(DESKTOP_CHANNEL);
