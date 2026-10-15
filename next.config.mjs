/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: every page is pre-rendered to HTML at build time (out/).
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
