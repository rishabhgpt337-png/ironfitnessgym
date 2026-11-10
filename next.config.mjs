/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1440, 1920],
  },
};

export default nextConfig;
