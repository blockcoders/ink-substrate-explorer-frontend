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
  i18n: {
    // The locales you want to support in your app
    locales: ['en', 'es'],
    // The default locale you want to be used when visiting a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
