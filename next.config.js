/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  i18n,
  experimental: {
    appDir: true,
    // typedRoutes: true,
    swcPlugins: [["next-superjson-plugin", {}]],
  },
}

module.exports = nextConfig
