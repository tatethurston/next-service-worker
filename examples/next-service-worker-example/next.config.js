const { serviceWorker } = require("next-service-worker");

const withServiceWorker = serviceWorker({
  // next-service-worker config here...
  enableWorkboxLogging: true,
  // workbox: {
  // workbox config here...
  //},
});

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withServiceWorker(nextConfig);
