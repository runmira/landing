import fs from 'fs';
import path from 'path';

export type ReleaseChannel = 'stable' | 'beta' | 'alpha';

export interface Release {
  version: string;   // "0.4.0", "0.6.1-alpha.8"
  slug: string;      // "v0.4.0"
  /** Prerelease channel, from the version suffix. */
  channel: ReleaseChannel;
  /** The GitHub release tag: desktop prereleases are tagged `desktop-v…`. */
  tag: string;
  title: string;     // text of the first # heading
  headline: string;  // first paragraph after h1
  features: string[]; // ### headings inside ## New
  sections: string[]; // ## headings (Fixed, Under the hood, etc.)
  content: string;   // full markdown
}

function parseRelease(slug: string, raw: string): Release {
  const lines = raw.split('\n');

  const titleLine = lines.find((l) => /^# /.test(l));
  const title = titleLine?.replace(/^# /, '').trim() ?? slug;

  let pastH1 = false;
  let headline = '';
  for (const line of lines) {
    if (/^# /.test(line)) { pastH1 = true; continue; }
    if (pastH1 && line.trim() && !line.startsWith('#')) {
      headline = line.trim();
      break;
    }
  }

  // ### headings inside ## New
  const features: string[] = [];
  let inNew = false;
  for (const line of lines) {
    if (/^## New/.test(line)) { inNew = true; continue; }
    if (/^## /.test(line)) inNew = false;
    if (inNew && /^### /.test(line)) features.push(line.replace(/^### /, '').trim());
  }

  // Newer notes write ## New as bullets, not ### headings: use the bold
  // titles from ## Highlights instead, so the card still lists features.
  if (features.length === 0) {
    let inHighlights = false;
    for (const line of lines) {
      if (/^## Highlights/.test(line)) { inHighlights = true; continue; }
      if (/^## /.test(line)) inHighlights = false;
      const m = inHighlights ? /^- \*\*(.+?)\*\*/.exec(line) : null;
      if (m) features.push(m[1].replace(/[.:]$/, '').trim());
    }
  }

  const sections = lines
    .filter((l) => /^## /.test(l))
    .map((l) => l.replace(/^## /, '').trim());

  const version = slug.replace(/^v/, '');
  const channel: ReleaseChannel = /-alpha/.test(version) ? 'alpha' : /-beta/.test(version) ? 'beta' : 'stable';
  const tag = channel === 'stable' ? `v${version}` : `desktop-v${version}`;
  return { version, slug, channel, tag, title, headline, features, sections, content: raw };
}

/** `v0.6.1.md`, `v0.6.1-alpha.8.md`, `v0.6.1-beta.2.md`. */
const RELEASE_FILE = /^v\d+\.\d+\.\d+(?:-(?:alpha|beta)\.\d+)?\.md$/;

/** Newest first by version: numbers compare as numbers. Within one version,
 *  betas rank above alphas, and both above the version's base file
 *  (`v0.6.1.md`): that file is the version's shared notes, written when its
 *  first build went out, while each prerelease file is a later build. */
function compareVersionsDesc(a: string, b: string): number {
  const parse = (v: string) => {
    const m = /^v?(\d+)\.(\d+)\.(\d+)(?:-(alpha|beta)\.(\d+))?/.exec(v);
    if (!m) return [0, 0, 0, 0, 0];
    const rank = m[4] === 'beta' ? 2 : m[4] === 'alpha' ? 1 : 0;
    return [Number(m[1]), Number(m[2]), Number(m[3]), rank, Number(m[5] ?? 0)];
  };
  const pa = parse(a);
  const pb = parse(b);
  for (let i = 0; i < pa.length; i++) if (pa[i] !== pb[i]) return pb[i] - pa[i];
  return 0;
}

async function fetchFromGitHub(): Promise<Release[]> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/runmira/mira/contents/releases',
      { next: { revalidate: 3600 }, headers: { Accept: 'application/vnd.github.v3+json' } },
    );
    if (!res.ok) return [];
    const files: { name: string; download_url: string }[] = await res.json();
    const mdFiles = files
      .filter((f) => RELEASE_FILE.test(f.name))
      .sort((a, b) => compareVersionsDesc(a.name, b.name));
    return Promise.all(
      mdFiles.map(async (f) => {
        const r = await fetch(f.download_url, { next: { revalidate: 3600 } });
        return parseRelease(f.name.replace('.md', ''), await r.text());
      }),
    );
  } catch {
    return [];
  }
}

export async function getReleases(): Promise<Release[]> {
  // Local monorepo: landing/ is a sibling of mira/
  const localPath = path.resolve(process.cwd(), '..', 'mira', 'releases');
  try {
    if (fs.existsSync(localPath)) {
      const files = fs
        .readdirSync(localPath)
        .filter((f) => RELEASE_FILE.test(f))
        .sort(compareVersionsDesc);
      if (files.length > 0) {
        return files.map((f) =>
          parseRelease(f.replace('.md', ''), fs.readFileSync(path.join(localPath, f), 'utf-8')),
        );
      }
    }
  } catch { /* fall through */ }
  return fetchFromGitHub();
}

export async function getRelease(slug: string): Promise<Release | null> {
  const all = await getReleases();
  return all.find((r) => r.slug === slug) ?? null;
}
