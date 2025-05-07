/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.clerk.com', 'images.clerk.dev'],
  },
  reactStrictMode: true,
  

  eslint: {

    ignoreDuringBuilds: true,
    

    dirs: [
      'app',
      'components',
      'pages',
      'lib',
      'utils',

    ],
  },
}

module.exports = nextConfig
