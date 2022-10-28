/** @type {import('next').NextConfig} */
const nextConfig = {
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
  }
}

module.exports = nextConfig
