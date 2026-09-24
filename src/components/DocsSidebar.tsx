'use client';

import {
  BookOpen,
  Settings2,
  Zap,
  Layers,
} from 'lucide-react';
import { sections, type DocPage, type DocSection } from '@/docs';

const SECTION_ICONS: Record<string, React.ReactNode> = {
  'getting-started': <BookOpen size={13} />,
  'configuration':   <Settings2 size={13} />,
  'features':        <Zap size={13} />,
  'advanced':        <Layers size={13} />,
};

interface Props {
  activePage: DocPage;
  onPageChange: (page: DocPage) => void;
}

export function DocsSidebar({ activePage, onPageChange }: Props) {
  return (
    <aside className="w-[252px] shrink-0 h-full flex flex-col border-r border-ink/8 bg-cream/50">
      {/* scrollable nav */}
      <div className="flex-1 overflow-y-auto py-7 px-3">
        {sections.map((section) => (
          <SectionGroup
            key={section.id}
            section={section}
            activePage={activePage}
            onPageChange={onPageChange}
          />
        ))}
      </div>

      {/* footer */}
      <div className="px-5 py-4 border-t border-ink/8">
        <a
          href="https://github.com/runmira/mira"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-[11.5px] text-ink/40 hover:text-ink/65 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current shrink-0">
            <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.74 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.26 5.69.41.35.78 1.05.78 2.12v3.14c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>
          <span>runmira/mira</span>
          <span className="ml-auto rounded-full bg-ink/6 px-2 py-0.5 text-[10px] font-semibold tracking-wide">
            v0.3.9
          </span>
        </a>
      </div>
    </aside>
  );
}

function SectionGroup({
  section,
  activePage,
  onPageChange,
}: {
  section: DocSection;
  activePage: DocPage;
  onPageChange: (p: DocPage) => void;
}) {
  const sectionActive = section.pages.some((p) => p.id === activePage.id);

  return (
    <div className="mb-6">
      <div
        className={[
          'flex items-center gap-2 px-2.5 mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.18em] transition-colors',
          sectionActive ? 'text-coral/80' : 'text-ink/35',
        ].join(' ')}
      >
        <span className={sectionActive ? 'text-coral' : 'text-ink/30'}>
          {SECTION_ICONS[section.id]}
        </span>
        {section.title}
      </div>

      <nav className="flex flex-col gap-0.5">
        {section.pages.map((page) => {
          const active = page.id === activePage.id;
          return (
            <button
              key={page.id}
              type="button"
              onClick={() => onPageChange(page)}
              className={[
                'w-full text-left pl-4 pr-3 py-1.5 rounded-xl text-[13px] transition-all relative overflow-hidden',
                active
                  ? 'text-coral font-semibold'
                  : 'text-ink/55 hover:text-ink hover:bg-white/60',
              ].join(' ')}
            >
              {active && (
                <span className="absolute inset-0 bg-gradient-to-r from-coral/10 to-transparent rounded-xl" />
              )}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-coral rounded-full" />
              )}
              <span className="relative">{page.title}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
