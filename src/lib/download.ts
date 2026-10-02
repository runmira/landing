/**
 * The Mira desktop app's download. The desktop release workflow keeps each
 * channel's latest build at a fixed name in runmira/mira's
 * `desktop-updates` release (Mira-arm64.dmg, Mira-beta-arm64.dmg,
 * Mira-alpha-arm64.dmg), so links never need a version bump.
 *
 * The site offers the alpha for now: Mira itself is in alpha. Switch
 * DESKTOP_CHANNEL to 'stable' when the app leaves it.
 */
export type DesktopChannel = 'alpha' | 'beta' | 'stable';
export const DESKTOP_CHANNEL = 'alpha' as DesktopChannel;

const FEED = 'https://github.com/runmira/mira/releases/download/desktop-updates';

export const DESKTOP_DOWNLOAD_URL =
  DESKTOP_CHANNEL === 'stable' ? `${FEED}/Mira-arm64.dmg` : `${FEED}/Mira-${DESKTOP_CHANNEL}-arm64.dmg`;

export const DESKTOP_REQUIREMENTS =
  DESKTOP_CHANNEL === 'stable'
    ? 'macOS 11+ · Apple silicon'
    : `${DESKTOP_CHANNEL === 'alpha' ? 'Alpha' : 'Beta'} · macOS 11+ · Apple silicon · updates itself`;
