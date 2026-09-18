/**
 * Each provider carries the domain we source its favicon from. Loaded
 * through Google's public favicon service so we get a normalized PNG at
 * the size we ask for, regardless of the origin's own .ico quirks.
 */
type Provider = { name: string; domain: string };

const PROVIDERS: Provider[] = [
  { name: 'OpenRouter', domain: 'openrouter.ai' },
  { name: 'OpenAI', domain: 'openai.com' },
  { name: 'Anthropic', domain: 'anthropic.com' },
  { name: 'Groq', domain: 'groq.com' },
  { name: 'DeepSeek', domain: 'deepseek.com' },
  { name: 'Gemini', domain: 'gemini.google.com' },
  { name: 'xAI', domain: 'x.ai' },
  { name: 'Ollama', domain: 'ollama.com' },
  { name: 'llama.cpp', domain: 'github.com' },
  { name: 'LM Studio', domain: 'lmstudio.ai' },
  { name: 'vLLM', domain: 'docs.vllm.ai' },
  { name: 'Together', domain: 'together.ai' },
];

const faviconUrl = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

export function Providers() {
  // Duplicate the list so the CSS-only marquee loop is seamless.
  const track = [...PROVIDERS, ...PROVIDERS];

  return (
    <section
      id="providers"
      className="relative overflow-hidden bg-cream pb-28 pt-4"
    >
      {/* Warm ambient — cool balance to Hero's upper-right glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-coral/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            Bring your own model
          </div>
          <h2 className="text-balance font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.025em] text-ink sm:text-5xl md:text-6xl">
            Anything with an OpenAI-compatible API{' '}
            <span className="italic text-coral">works</span>.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">
            Swap providers mid-session with{' '}
            <code className="rounded-full border border-ink/10 bg-white/70 px-2 py-0.5 font-mono text-sm text-ink">
              /model
            </code>
            . Local runtimes are first-class — no proxy required.
          </p>
        </div>
      </div>

      {/* Full-bleed marquee row — capsule chips echo the Hero status pill.
          Each cell pairs the remote favicon with the provider name. */}
      <div
        className="relative mt-14 overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="marquee-track flex w-max gap-3 whitespace-nowrap py-2">
          {track.map((p, i) => (
            <span
              key={`${p.name}-${i}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/60 py-2 pl-2 pr-5 font-mono text-sm text-ink/75 backdrop-blur-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={faviconUrl(p.domain)}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                width={20}
                height={20}
                className="h-5 w-5 flex-none rounded-full bg-white object-contain p-0.5 ring-1 ring-ink/10"
              />
              <span>{p.name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Proof strip — three mini-terminals showing an actual /model
          swap. Grounds the "swap mid-session" claim in something you
          could copy verbatim. */}
      <div className="relative mx-auto mt-14 max-w-6xl px-6 md:px-12">
        <div className="grid gap-3 sm:grid-cols-3">
          {SWAP_EXAMPLES.map((ex) => (
            <div
              key={ex.command}
              className="overflow-hidden rounded-2xl border border-white/10 bg-obsidian/95 shadow-lg shadow-coral/5"
            >
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500/70" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
                <span className="h-2 w-2 rounded-full bg-green-500/70" />
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-mist/45">
                  {ex.tag}
                </span>
              </div>
              <div className="space-y-1 px-4 py-3 font-mono text-[12px] leading-[1.6] text-ghost">
                <div>
                  <span className="font-bold text-coral">&gt; </span>
                  <span className="text-ghost">{ex.command}</span>
                </div>
                <div className="text-mist/60">
                  <span className="font-bold text-green-500">● </span>
                  now using <span className="text-ghost">{ex.model}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SWAP_EXAMPLES = [
  {
    tag: 'hosted',
    command: '/model openai/gpt-4o',
    model: 'openai/gpt-4o',
  },
  {
    tag: 'local',
    command: '/model ollama/llama3',
    model: 'ollama/llama3',
  },
  {
    tag: 'hosted',
    command: '/model anthropic/claude-sonnet-4-6',
    model: 'anthropic/claude-sonnet-4-6',
  },
];

export default Providers;
