# next-service-worker

<blockquote>A Next.js plugin that generates a Service Worker. Powered by Workbox.</blockquote>

<br />

<a href="https://www.npmjs.com/package/next-service-worker">
  <img src="https://img.shields.io/npm/v/next-service-worker.svg">
</a>
<a href="https://github.com/tatethurston/next-service-worker/blob/master/LICENSE">
  <img src="https://img.shields.io/npm/l/next-service-worker.svg">
</a>
<a href="https://www.npmjs.com/package/next-service-worker">
  <img src="https://img.shields.io/npm/dy/next-service-worker.svg">
</a>

## What is this? 🧐

A minimal wrapper around [Workbox](https://developers.google.com/web/tools/workbox) to quickly add a [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) to your [Next.js](https://nextjs.org/) site. Get precached pages and offline support out of the box.

## Installation & Usage 📦

1. Add this package to your project:

   - `npm install next-service-worker` or `yarn add next-service-worker`

2. Update your `next.config.js`:

   ```diff
    + const { serviceWorker } = require("next-service-worker");
    + const withServiceWorker = serviceWorker();

    /** @type {import('next').NextConfig} */
    const nextConfig = {
      reactStrictMode: true,
    };

    - module.exports = nextConfig;
    + module.exports = withServiceWorker(nextConfig);
   ```

3. That's it! A service worker that precaches all of your build's static assets will be generated. Static assets will be served from the service worker's cache instead of making network calls, speeding up your page views and enabling offline viewing 🙌.

## Verification 🤔

1. To view the production service worker, run `next build && next start`.
2. The service worker must first install before it intercepts any traffic. You can view the status of the service worker in Chrome by opening the dev console, clicking the `Application` tab and then clicking the `Service Workers` tab.
3. Disable your internet connection and click around your site. Your assets will be served by the service worker. This is most obvious when you are disconnected from the internet, but even when users have an internet connection your assets will be served from the service worker and not from the network -- markedly speeding up these requests.

## API Overview 🛠

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>

<tr>
  <td>registration.autoRegister</td>
<td>

Autoregister the service worker.

If `false`, then the application must initialize the service worker by invoking `register`. Set this to `false` if you'd like to take control over when you service worker is initialized. You'll then need to add something like the following to your application:

```javascript
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}
```

Defaults to `true`. Recommended: `true`.

</td>
</td>
  <td>boolean | undefined</td>
</tr>

<tr>
  <td>workbox</td>
<td>
Options passed to `worbox-build`. See all available configuration options [here](https://developer.chrome.com/docs/workbox/modules/workbox-build/)

Defaults to `GenerateSW` which will generate a service worker.

Note: `injectManifest` is not supported at this time. If you would like it to be supported, please [open an issue](https://github.com/tatethurston/astrojs-service-worker/issues/new")

</td>
  <td>InjectManifestOptions | GenerateSWOptions</td>
</tr>
  </tbody>
</table>

## Examples 🚀

Check out the [next-service-worker-example](https://github.com/tatethurston/next-service-worker/blob/master/examples/next-service-worker-example/). The only change from the default NextJS setup is the addition of `next.config.js`!

## Common Service Worker Pitfalls ⚠️

You must serve your application over HTTPS in production environments. [Service Workers must be served from the site's origin over HTTPS](https://developers.google.com/web/fundamentals/primers/service-workers).

Some browsers special case `localhost`, so this may not be necessary during local development. HTTPS is _not_ handled by this library. You can use a reverse proxy like [Nginx](https://www.nginx.com/) or [Caddy](https://caddyserver.com/) if you want to setup HTTPS for local development.

The service worker origin constraint means that service workers can not control pages on a different subdomain. Eg `mysite.com` can not be controlled by a service worker if that was served from a subdomain such as `mycdn.mysite.com`. To learn more about how service workers work in general, read [MDN's documentation](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

## Related Projects

- [Next PWA](https://www.npmjs.com/package/next-pwa)
- [Next Offline](https://github.com/hanford/next-offline)

## Contributing 👫

PR's and issues welcomed! For more guidance check out [CONTRIBUTING.md](https://github.com/tatethurston/next-service-worker/blob/master/CONTRIBUTING.md)

## Licensing 📃

See the project's [MIT License](https://github.com/tatethurston/next-service-worker/blob/master/LICENSE).
