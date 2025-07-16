/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/tech-club-blog' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/tech-club-blog/' : '',
}

export default nextConfig
