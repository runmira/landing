import fs from 'fs';
import path from 'path';

export interface Release {
  version: string;   // "0.4.0"
  slug: string;      // "v0.4.0"
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

  const sections = lines
    .filter((l) => /^## /.test(l))
    .map((l) => l.replace(/^## /, '').trim());

  return { version: slug.replace(/^v/, ''), slug, title, headline, features, sections, content: raw };
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
      .filter((f) => /^v[\d.]+\.md$/.test(f.name))
      .sort((a, b) => b.name.localeCompare(a.name));
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
        .filter((f) => /^v[\d.]+\.md$/.test(f))
        .sort()
        .reverse();
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
