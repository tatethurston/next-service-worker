// eslint-disable-next-line no-undef
self.addEventListener("install", () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,no-undef
  self.skipWaiting();
});

// eslint-disable-next-line no-undef
self.addEventListener("activate", (event) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,no-undef
  event.waitUntil(clients.claim());
});

// eslint-disable-next-line no-undef
console.info(
  "[next-service-worker] The service worker has been disabled in development. It will be generated for production builds. Run `next build` to see the service worker. You may opt into service worker generation in local development by setting `serviceWorker.enableInDevelopment: true` in your next.config.js"
);
