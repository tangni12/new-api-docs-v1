import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  basePath,
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'www.xmjt.fun',
        // newapi.pro domains
        'docs.newapi.pro',
        'newapi.pro',
        'www.newapi.pro',
        // newapi.ai domains
        'docs.newapi.ai',
        'newapi.ai',
        'www.newapi.ai',
        // Vercel preview
        'new-api-docs-v1.vercel.app',
      ],
    },
  },
  async headers() {
    return [
      {
        // Apply charset to HTML pages
        source: '/:lang(zh)/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/html; charset=utf-8',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:lang/docs/:path*.mdx',
        destination: '/:lang/llms.mdx/:path*',
      },
    ];
  },
};

export default withMDX(config);
