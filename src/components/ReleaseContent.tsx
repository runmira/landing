'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import { Check, Copy } from 'lucide-react';
import { slugify } from '@/docs';

export function ReleaseContent({ content }: { content: string }) {
  // Strip the leading h1 — rendered separately in the hero
  const body = content.replace(/^# .+\n\n?/, '');

  return (
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
        {body}
      </ReactMarkdown>
    </article>
  );
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return (node as React.ReactNode[]).map(extractText).join('');
  if (node != null && typeof node === 'object' && 'props' in node) {
    return extractText((node as { props: { children?: React.ReactNode } }).props.children);
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
