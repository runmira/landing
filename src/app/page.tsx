import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TerminalDemo } from '@/components/TerminalDemo';
import { Features } from '@/components/Features';
import { Providers } from '@/components/Providers';
import { Install } from '@/components/Install';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <main className="min-h-screen bg-cream font-body text-ink">
      <Header />
      <Hero />
      <TerminalDemo />

      {/* Bridge — a pull-quote strip that carries the eye from the
          terminal specimen into the manifesto. Same coral-eyebrow
          vocabulary as the section pills so it reads as a chorus line,
          not a new section. */}
      <section
        aria-label="Pull quote"
        className="relative bg-cream pb-24 pt-4"
      >
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <div className="hairline mb-10" />
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-coral">
            The premise
          </div>
          <p className="mt-4 text-balance font-heading text-2xl font-medium leading-[1.25] tracking-[-0.015em] text-ink sm:text-3xl md:text-4xl">
            A coding agent should be something you can{' '}
            <span className="italic text-coral">read the source of</span>,{' '}
            <span className="italic text-coral">edit</span>, and{' '}
            <span className="italic text-coral">turn off</span>.
          </p>
        </div>
      </section>

      <Features />
      <Providers />
      <Install />
      <Footer />
    </main>
  );
}
