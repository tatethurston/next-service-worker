if (!self.define) {
  let e,
    s = {};
  const i = (i, c) => (
    (i = new URL(i + ".js", c).href),
    s[i] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, t) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[n]) return;
    let a = {};
    const f = (e) => i(e, n),
      r = { module: { uri: n }, exports: a, require: f };
    s[n] = Promise.all(c.map((e) => r[e] || f(e))).then((e) => (t(...e), a));
  };
}
define(["./workbox-2b76552f"], function (e) {
  "use strict";
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/server/middleware-build-manifest.js",
          revision: "cf5e4e3d6432f227757f655244a32377",
        },
        {
          url: "/_next/server/middleware-react-loadable-manifest.js",
          revision: "49318b1fadb2d705059a2e0d8df88bb6",
        },
        {
          url: "/_next/server/next-font-manifest.js",
          revision: "a3d80152017437585192c18a2d658c45",
        },
        {
          url: "/_next/server/next-font-manifest.json",
          revision: "56c82133487f292a53950036df72ac52",
        },
        {
          url: "/_next/static/WSLMCX8CSO7esGi9_7Xtw/_buildManifest.js",
          revision: "bd9c03ae0cbffe51dc048e1cd37a6449",
        },
        {
          url: "/_next/static/WSLMCX8CSO7esGi9_7Xtw/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/framework-0f8888d1cd333966.js",
          revision: null,
        },
        {
          url: "/_next/static/chunks/main-c347dd2fdd7d24f2.js",
          revision: null,
        },
        {
          url: "/_next/static/chunks/pages/_app-5e0d5e9357150f1b.js",
          revision: null,
        },
        {
          url: "/_next/static/chunks/pages/_error-924c3a8f78a5d1e8.js",
          revision: null,
        },
        {
          url: "/_next/static/chunks/pages/index-e9e3887b7c82db9b.js",
          revision: null,
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-8fa1640cc84ba8fe.js",
          revision: null,
        },
        { url: "/_next/static/css/876d048b5dab7c28.css", revision: null },
        { url: "/_next/static/css/f9cd23ddd76c5e94.css", revision: null },
        {
          url: "/_next/static/media/2aaf0723e720e8b9-s.p.woff2",
          revision: "e1b9f0ecaaebb12c93064cd3c406f82b",
        },
        {
          url: "/_next/static/media/9c4f34569c9b36ca-s.woff2",
          revision: "2c1fc211bf5cca7ae7e7396dc9e4c824",
        },
        {
          url: "/_next/static/media/ae9ae6716d4f8bf8-s.woff2",
          revision: "b0c49a041e15bdbca22833f1ed5cfb19",
        },
        {
          url: "/_next/static/media/b1db3e28af9ef94a-s.woff2",
          revision: "70afeea69c7f52ffccde29e1ea470838",
        },
        {
          url: "/_next/static/media/b967158bc7d7a9fb-s.woff2",
          revision: "08ccb2a3cfc83cf18d4a3ec64dd7c11b",
        },
        {
          url: "/_next/static/media/c0f5ec5bbf5913b7-s.woff2",
          revision: "8ca5bc1cd1579933b73e51ec9354eec9",
        },
        {
          url: "/_next/static/media/d1d9458b69004127-s.woff2",
          revision: "9885d5da3e4dfffab0b4b1f4a259ca27",
        },
      ],
      {},
    ),
    e.cleanupOutdatedCaches();
});
