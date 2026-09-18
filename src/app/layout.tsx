import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://runmira.com'),
  title: 'Mira · The open-source coding agent you run yourself',
  description:
    'Mira reads your code, edits files, runs commands, and reviews diffs — from a terminal. Bring your own model. Sessions and configuration live as plain files on disk.',
  openGraph: {
    title: 'Mira · The open-source coding agent you run yourself',
    description:
      'Bring your own model. Own your machine, your key, your history. Apache-2.0.',
    url: 'https://runmira.com',
    siteName: 'Mira',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mira · The open-source coding agent you run yourself',
    description:
      'Bring your own model. Own your machine, your key, your history. Apache-2.0.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
