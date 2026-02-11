import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://cdn.jsdelivr.net https://*.vercel.app;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com blob:;
              font-src 'self' https://fonts.gstatic.com data: blob:;
              img-src 'self' data: https: blob:;
              media-src 'self' data: https: blob:;
              connect-src 'self' https: wss: ws:;
              worker-src 'self' blob:;
              frame-ancestors 'none';
              base-uri 'self';
              form-action 'self';
            `.replace(/\s+/g, ' ').trim(),
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
