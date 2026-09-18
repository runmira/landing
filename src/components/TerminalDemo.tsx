/**
 * Pixel-approximation of the Mira TUI. Hand-renders the same rows the
 * TUI would draw, with the same colors, spacing, and pulsing brand mark
 * so the site and the terminal feel like one product.
 */
export function TerminalDemo() {
  return (
    <section id="terminal" className="mx-auto max-w-6xl px-6 pb-28 md:px-12">
      <div className="relative">
        {/* Ambient glow behind the terminal */}
        <div
          aria-hidden
          className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-coral/10 via-transparent to-transparent blur-2xl"
        />

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-obsidian/95 backdrop-blur">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-green-500/70" />
            <span className="ml-3 font-mono text-xs text-mist/40">
              ~/projects/my-app — mira
            </span>
          </div>

          <div className="font-mono text-[13px] leading-[1.65]">
            {/* Header row inside the TUI */}
            <div className="flex flex-wrap items-center gap-1 border-b border-white/8 px-6 py-2.5 text-xs">
              <span className="font-bold text-coral">ℳ mira</span>
              <span className="text-mist/40"> · </span>
              <span className="text-ghost">claude-sonnet-4-6</span>
              <span className="text-mist/40"> · </span>
              <span className="font-bold text-green-500">manual</span>
              <span className="text-mist/40"> · ⎇ main</span>
              <span className="ml-auto text-mist/40">
                ↑12.3k ↓4.1k · 15% · $0.024
              </span>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div>
                <span className="font-bold text-coral">&gt; </span>
                <span className="text-ghost">
                  refactor the auth middleware to use httpOnly cookies
                </span>
              </div>

              <div>
                <div>
                  <span className="font-bold text-green-500">● </span>
                  <span className="font-bold text-coral">Reading 3 files</span>
                </div>
                <div className="pl-3 text-mist/55">
                  <div>
                    <span className="text-mist/30">└ </span>
                    src/middleware.ts
                  </div>
                  <div>
                    <span className="text-mist/30">└ </span>
                    src/lib/supabase/server.ts
                  </div>
                  <div>
                    <span className="text-mist/30">└ </span>
                    src/lib/supabase/client.ts
                  </div>
                </div>
              </div>

              <div className="text-ghost">
                Here&apos;s a rundown of{" "}
                <span className="text-coral">middleware.ts</span> — the Next.js
                auth gatekeeper. The gap is that we&apos;re setting the session
                cookie without <em>httpOnly</em>, so any client script can read
                it.
              </div>

              <div>
                <div>
                  <span className="font-bold text-green-500">● </span>
                  <span className="font-bold text-coral">Edit </span>
                  <span className="text-ghost">src/middleware.ts</span>
                  <span className="ml-2 font-bold text-green-500">+8</span>
                  <span className="font-bold text-red-500"> -3</span>
                </div>
                <div className="pl-4 font-mono text-[12px] leading-relaxed text-mist/80">
                  <div>
                    <span className="font-bold text-red-500">- </span>
                    <span className="text-red-400">
                      res.cookies.set(&apos;sb-session&apos;, session.access_token)
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-green-500">+ </span>
                    <span className="text-green-400">
                      res.cookies.set(&apos;sb-session&apos;, session.access_token,{" {"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-green-500">+ </span>
                    <span className="text-green-400">
                      &nbsp;&nbsp;httpOnly: true, secure: true, sameSite:
                      &apos;lax&apos;,
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-green-500">+ </span>
                    <span className="text-green-400">{"})"}</span>
                  </div>
                </div>
              </div>

              <div className="text-mist/70">
                <span className="animate-pulse-logo font-bold text-coral">ℳ </span>
                <span className="font-bold text-coral">Wrangling</span>
                <span className="text-mist/50">
                  {" … (12s · ↓1.4k tokens · esc to interrupt)"}
                </span>
              </div>
            </div>

            {/* Composer */}
            <div className="border-t border-coral/40 px-6 py-3">
              <div className="flex items-center gap-3">
                <span className="font-bold text-coral">▸▸</span>
                <span className="text-ghost">
                  make the change and add a test for the cookie flags
                </span>
                <span className="animate-caret inline-block h-4 w-2 bg-coral" aria-hidden />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-mist/40">
                <span>
                  enter send · / cmd · @ file · shift+tab mode · esc esc quit
                </span>
                <span>
                  <span className="font-bold text-green-500">ask on writes</span>
                  <span> · shift+tab to cycle</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TerminalDemo;