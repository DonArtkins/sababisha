/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
    ],
  },
  // Ensure brand PNGs are available to API routes that embed them via CID
  outputFileTracingIncludes: {
    '/api/contact': ['./public/logo.png', './public/email/**/*'],
    '/api/newsletter': ['./public/logo.png', './public/email/**/*'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
