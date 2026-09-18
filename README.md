# mira landing

Marketing page for [Mira](https://github.com/runmira/mira) — the
open-source coding agent you run yourself. Next.js 15 App Router,
Tailwind, fully static (no server components hitting an API), so it
deploys anywhere that serves a build folder.

## Dev

```bash
npm install
npm run dev              # http://localhost:3100
```

Runs on port `3100` so it doesn't collide with a sibling `apps/web` on
`3000`. Other scripts:

| script            | what it does                       |
| ----------------- | ---------------------------------- |
| `npm run build`   | production build → `.next/`        |
| `npm run start`   | serve the build locally on `3100`  |
| `npm run lint`    | next lint                          |
| `npm run typecheck` | `tsc --noEmit` — CI-safe check   |

## Deploy — Vercel (recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frunmira%2Flanding)

The repo ships a `vercel.json` that pins:

- `framework: nextjs` (Vercel auto-detects too, but explicit wins)
- `regions: ["iad1"]` — US East, closest to the current traffic
- long `Cache-Control: max-age=31536000, immutable` for `/_next/static`
  and image extensions
- safe defaults for `X-Content-Type-Options`, `Referrer-Policy`, and
  `Permissions-Policy`

CLI flow if you'd rather script it:

```bash
npm i -g vercel
vercel link             # first time only
vercel                  # preview deploy
vercel --prod           # production
```

No environment variables required — the whole page is static and
public. If you add a form or an analytics endpoint later, wire the env
in the Vercel dashboard (or `vercel env add`).

### Custom domain

Point `runmira.com` (or `mira.sh`) at the Vercel project in Domains →
Add. `layout.tsx` already sets `metadataBase` to `https://runmira.com`
so open-graph URLs resolve; if you go with a different apex, update
that plus `robots.ts` and `sitemap.ts`.

## Deploy — anywhere else

The page is fully static — no server components hitting an API — so it
also builds cleanly for GitHub Pages, Cloudflare Pages, and Netlify.
For a static export:

```bash
npm run build
# .next/ contains the build; use `next export` or drop the
# `.next/standalone/` output behind any static host.
```

## Design tokens

The palette mirrors the TUI (salmon/cream/ink) so the site and the
terminal feel like the same product. Tokens live in
`tailwind.config.ts` under `theme.extend.colors` — bound to the CSS
variables in `src/app/globals.css`. Change one to change both.

## Provider favicons

The "Bring your own model" marquee loads twelve favicons from Google's
public favicon service (`https://www.google.com/s2/favicons?...`).
No API key, cached by the browser after first load. If you swap the
list, edit `PROVIDERS` in `src/components/Providers.tsx` — each entry
is `{ name, domain }`.
