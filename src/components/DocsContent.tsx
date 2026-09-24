'use client';

import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import { Check, ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import { adjacentPages, sections, slugify, type DocPage } from '@/docs';
import { TuiShowcase } from './TuiShowcase';

interface Props {
  page: DocPage;
  onNavigate: (page: DocPage) => void;
}

function getSectionTitle(pageId: string): string {
  for (const s of sections) {
    if (s.pages.some((p) => p.id === pageId)) return s.title;
  }
  return '';
}

export function DocsContent({ page, onNavigate }: Props) {
  const { prev, next } = adjacentPages(page.id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionTitle = getSectionTitle(page.id);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [page.id]);

  return (
    <div ref={scrollRef} className="flex-1 min-w-0 h-full overflow-y-auto bg-white/40">
      <div className="max-w-[700px] mx-auto py-12 px-10">

        {/* Page eyebrow + title */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 mb-3 text-[10.5px] font-bold uppercase tracking-[0.18em] text-coral/80">
            <span className="w-1 h-1 rounded-full bg-coral inline-block" />
            {sectionTitle}
          </div>
          <h1 className="text-[2.2rem] font-bold tracking-[-0.03em] leading-[1.1] text-ink">
            {page.title}
          </h1>
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-coral/50 to-transparent rounded-full" />
        </div>

        {page.id === 'terminal-ui' && <TuiShowcase />}

        <article className="docs-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeHighlight, { detect: false, ignoreMissing: true }]]}
            components={{
              pre({ children }) {
                return <>{children}</>;
              },
              code({ className, children }: React.ComponentProps<'code'>) {
                const raw = String(children ?? '').replace(/\n$/, '');
                const lang = /language-([\w-]+)/.exec(className ?? '')?.[1];
                const looksInline = !raw.includes('\n') && (!lang || lang === 'text') && raw.length <= 80;
                if (looksInline) return <code className={className}>{children}</code>;
                return <CodeBlock lang={lang} raw={raw} className={className}>{children}</CodeBlock>;
              },
              h1() {
                // h1 is rendered above the article as a styled title, suppress inline
                return null;
              },
              h2({ children }) {
                const text = extractText(children as React.ReactNode);
                return <h2 id={slugify(text)}>{children}</h2>;
              },
              h3({ children }) {
                const text = extractText(children as React.ReactNode);
                return <h3 id={slugify(text)}>{children}</h3>;
              },
              a({ href, children, ...rest }) {
                return (
                  <a
                    href={href}
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    {...rest}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {/* Strip the first h1 since we render it above */}
            {page.content.replace(/^# .+\n\n?/, '')}
          </ReactMarkdown>
        </article>

        {/* Prev / Next */}
        <div className="mt-14 pt-8 border-t border-ink/8 flex items-stretch gap-3">
          {prev ? (
            <NavCard direction="prev" page={prev} onNavigate={onNavigate} />
          ) : <div className="flex-1" />}
          {next ? (
            <NavCard direction="next" page={next} onNavigate={onNavigate} />
          ) : <div className="flex-1" />}
        </div>
      </div>
    </div>
  );
}

function NavCard({
  direction,
  page,
  onNavigate,
}: {
  direction: 'prev' | 'next';
  page: DocPage;
  onNavigate: (p: DocPage) => void;
}) {
  const isPrev = direction === 'prev';
  return (
    <button
      type="button"
      onClick={() => onNavigate(page)}
      className={[
        'flex-1 group flex items-center gap-3 px-5 py-4 rounded-2xl border border-ink/10',
        'bg-white/70 hover:bg-white hover:border-coral/30 hover:shadow-sm transition-all',
        isPrev ? 'text-left' : 'flex-row-reverse text-right',
      ].join(' ')}
    >
      <span
        className={[
          'shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors',
          'bg-ink/5 group-hover:bg-coral/10 text-ink/35 group-hover:text-coral',
        ].join(' ')}
      >
        {isPrev
          ? <ChevronLeft size={14} />
          : <ChevronRight size={14} />}
      </span>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35 mb-0.5">
          {isPrev ? 'Previous' : 'Next'}
        </div>
        <div className="text-[13px] font-semibold text-ink group-hover:text-coral transition-colors leading-tight">
          {page.title}
        </div>
      </div>
    </button>
  );
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return (node as React.ReactNode[]).map(extractText).join('');
  if (node != null && typeof node === 'object' && 'props' in node) {
    const el = node as { props: { children?: React.ReactNode } };
    return extractText(el.props.children);
  }
  return String(node ?? '');
}

function CodeBlock({
  lang,
  raw,
  className,
  children,
}: {
  lang?: string;
  raw: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* ignore */ }
  }

  return (
    <div className="docs-code-block">
      <div className="docs-code-head">
        <div className="docs-code-dots">
          <span style={{ background: '#ff6b6b' }} />
          <span style={{ background: '#ffd93d' }} />
          <span style={{ background: '#6bcb77' }} />
        </div>
        {lang && lang !== 'text' && (
          <span className="docs-code-lang-badge">{lang}</span>
        )}
        <button
          type="button"
          className={['docs-code-copy', copied ? 'docs-code-copy--copied' : ''].join(' ')}
          onClick={copy}
          title="Copy to clipboard"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}
