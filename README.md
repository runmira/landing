# mira landing

Marketing page for [Mira](https://github.com/runmira/mira). Sibling to `../mira`
and `../apps/web`; independent Next.js 15 app with its own deploy target.

## Dev

```bash
cd landing
npm install
npm run dev              # http://localhost:3100
```

Runs on port `3100` so it doesn't collide with `apps/web` on `3000`.

## Deploy

Vercel (recommended):

```bash
vercel --prod
```

The page is fully static — no server components hitting an API — so it
also builds cleanly for GitHub Pages / Cloudflare Pages via `next
export`.

## Design tokens

The palette mirrors the TUI (salmon/cream/ink) so the site and the
terminal feel like the same product. Tokens live in `tailwind.config.ts`.
