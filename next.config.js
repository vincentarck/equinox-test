/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol:"https",
        hostname:"**"
      }
    ]
  }, 
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://equinox-rent-rici1p01v-vincentarck.vercel.app/:path*',
      },
    ]
  },
}

module.exports = nextConfig
