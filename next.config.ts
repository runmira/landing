import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // No point advertising Next.js as a header — trims a byte off every
  // response and removes a minor fingerprinting signal.
  poweredByHeader: false,
  // `curl -fsSL https://runmira.dev/install.sh | bash`: the installer is
  // served from here but always comes from the repo's main branch, so
  // there's no second copy to keep in sync.
  async rewrites() {
    return [{ source: '/install.sh', destination: 'https://raw.githubusercontent.com/runmira/mira/main/install.sh' }];
  },
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
