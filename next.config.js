/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
