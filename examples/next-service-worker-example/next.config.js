const { serviceWorker } = require("next-service-worker");
const withServiceWorker = serviceWorker();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withServiceWorker(nextConfig);
