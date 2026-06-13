/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — outputs plain HTML/CSS/JS to `out/` so the site can
  // be hosted on any web server (HostAfrica cPanel) with no Node runtime.
  output: 'export',
  // Emit every route as <route>/index.html so Apache (cPanel) serves
  // clean URLs like /payment/success/ without extra rewrite rules.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
}
module.exports = nextConfig
