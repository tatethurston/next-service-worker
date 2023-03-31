"use strict";
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
  "[service-worker-webpack-plugin] This is a noop service worker for local development. The configured service worker will be generated in production builds. Set the webpack mode to 'production' to see the production service worker. You may opt into service worker generation in local development by setting `serviceWorker.enableInDevelopment: true` in your webpack config. See https://github.com/tatethurston/service-worker-webpack for configuration options."
);
