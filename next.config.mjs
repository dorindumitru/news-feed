/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    finnHub: {
      apiKey: process.env.FINNHUB_API_KEY,
      apiEndpoint: process.env.FINNHUB_API_ENDPOINT,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
