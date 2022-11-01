/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SCHEMA_URL: process.env.SCHEMA_URL || 'http://localhost:8080/graphql',
    WS_PROVIDER: process.env.WS_PROVIDER,
  },
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blocks',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
