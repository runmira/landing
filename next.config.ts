import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // No point advertising Next.js as a header — trims a byte off every
  // response and removes a minor fingerprinting signal.
  poweredByHeader: false,
  images: {
    // The Providers marquee uses plain `<img>` for these (12 remote
    // favicons); we don't rely on next/image's loader for them. Still,
    // if we ever swap to next/image, this whitelist saves a round-trip
    // to enable it. Google's favicon service is stable and public.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons',
      },
    ],
  },
};

export default nextConfig;
