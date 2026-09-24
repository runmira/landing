'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { sections, type DocPage } from '@/docs';
import { DocsSidebar } from '@/components/DocsSidebar';
import { DocsContent } from '@/components/DocsContent';
import { DocsTOC } from '@/components/DocsTOC';

export default function DocsPage() {
  const [activePage, setActivePage] = useState<DocPage>(sections[0].pages[0]);

  return (
    <div className="flex flex-col h-screen bg-cream overflow-hidden">
      {/* Docs header */}
      <header className="h-14 shrink-0 border-b border-ink/8 bg-cream/80 backdrop-blur-xl flex items-center px-6 gap-4 z-40">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/mira-logo.png"
            alt="Mira"
            width={28}
            height={28}
            className="rounded-[7px] object-contain"
          />
          <span className="font-heading text-[15px] font-semibold tracking-[-0.01em] text-ink">
            mira
          </span>
        </Link>

        <div className="h-4 w-px bg-ink/12" />
        <span className="text-[13px] text-ink/45 font-medium">Docs</span>

        {/* Section breadcrumb */}
        <div className="hidden md:flex items-center gap-2 ml-2">
          {sections.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActivePage(s.pages[0])}
              className={[
                'text-[12.5px] px-2.5 py-1 rounded-full transition-colors',
                s.pages.some((p) => p.id === activePage.id)
                  ? 'bg-ink/6 text-ink font-medium'
                  : 'text-ink/45 hover:text-ink',
                i === 0 ? '' : '',
              ].join(' ')}
            >
              {s.title}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <a
            href="https://github.com/runmira/mira"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-obsidian px-4 py-1.5 text-[12px] font-semibold text-ghost shadow-sm transition-all hover:shadow-md hover:shadow-coral/15 active:scale-95"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-current">
              <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.74 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.26 5.69.41.35.78 1.05.78 2.12v3.14c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            GitHub
          </a>
        </div>
      </header>

      {/* Three-column layout */}
      <div className="flex flex-1 min-h-0">
        <DocsSidebar activePage={activePage} onPageChange={setActivePage} />
        <DocsContent page={activePage} onNavigate={setActivePage} />
        <DocsTOC page={activePage} />
      </div>
    </div>
  );
}
