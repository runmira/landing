'use client';

import { useEffect, useState } from 'react';
import { extractHeadings, type DocPage } from '@/docs';

interface Props {
  page: DocPage;
}

export function DocsTOC({ page }: Props) {
  const headings = extractHeadings(page.content);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    setActiveId('');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '0px 0px -65% 0px', threshold: 0 },
    );

    const timer = setTimeout(() => {
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el) observer.observe(el);
      }
    }, 80);

    return () => { clearTimeout(timer); observer.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.id]);

  if (headings.length === 0) return <div className="w-[210px] shrink-0" />;

  return (
    <aside className="w-[210px] shrink-0 h-full overflow-y-auto py-8 px-6 border-l border-ink/8">
      <div className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink/35 mb-4">
        On this page
      </div>

      {/* vertical track */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-ink/8" />

        <nav className="pl-3.5 flex flex-col gap-0.5">
          {headings.map((h) => {
            const active = activeId === h.id;
            return (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setActiveId(h.id);
                }}
                className={[
                  'block relative text-[12.5px] py-0.5 leading-[1.5] transition-all truncate',
                  h.level === 3 ? 'pl-3 text-[12px]' : '',
                  active
                    ? 'text-coral font-semibold'
                    : 'text-ink/40 hover:text-ink/70',
                ].join(' ')}
              >
                {active && (
                  <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-px h-full bg-coral" />
                )}
                {h.text}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
