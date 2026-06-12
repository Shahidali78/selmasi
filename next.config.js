/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — outputs plain HTML/CSS/JS to `out/` so the site can
  // be hosted on any web server (HostAfrica cPanel) with no Node runtime.
  output: 'export',
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
}
module.exports = nextConfig
