const withServiceWorker = require("next-service-worker");

module.exports = withServiceWorker({
  // next config here...
  serviceWorker: {
    // next-service-worker config here...
    enableWorkboxLogging: true,
    // workbox: {
    // workbox config here...
    //},
  },
});
