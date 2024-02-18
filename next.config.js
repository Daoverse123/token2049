/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API: process.env.API,
    DAO: process.env.DAO,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
  }
}

module.exports = nextConfig
