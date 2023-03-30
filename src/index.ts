import { join } from "path";
import type { Configuration, DefinePlugin } from "webpack";
import {
  type GenerateSWOptions,
  type InjectManifestOptions,
} from "workbox-build";
import { cwd } from "process";
import { ServiceWorkerPlugin } from "service-worker-webpack";

// https://github.com/vercel/next.js/blob/canary/packages/next/next-server/server/config-shared.ts#L66
interface NextConfig {
  basePath: string;
  target: string;
  assetPrefix: string;
  webpack?: (config: Configuration, options: NextOptions) => Configuration;
}

// https://github.com/vercel/next.js/blob/08baf526ff236d6c7e74e01ce9fbc35fce7f4565/packages/next/build/webpack-config.ts#L180
interface NextOptions {
  webpack: { DefinePlugin: typeof DefinePlugin };
  config: NextConfig;
  dev: boolean;
  isServer: boolean;
}

export interface ServiceWorkerConfig {
  /**
   * Enable the service worker in local development.
   *
   * The service worker's precaching of static files will prevent hot module reloading during development.
   *
   * If `false` then the service worker will not be registered and any previously installed service workers will be cleared.
   *
   * Defaults to `false`. Recommended: `false` for general development, `true` when testing or debugging your application's service worker.
   */
  enableInDevelopment?: boolean;
  registration?: {
    /**
     * Autoregister the service worker.
     *
     * If `false`, then the application must initialize the service worker by invoking `register`. Set this to `false` if you'd like to take control over when you service worker is initialized. You'll then need to add something like the following to your application:
     *
     * ```javascript
     * import { Workbox } from 'workbox-window';
     *
     * if ('serviceWorker' in navigator) {
     *   navigator.serviceWorker.register('/service-worker.js')
     * }
     * ```
     *
     * Defaults to `true`. Recommended: `true`.
     */
    autoRegister?: boolean;
  };
  /**
   * Options passed to `worbox-build`. See all available configuration options [here](https://developer.chrome.com/docs/workbox/modules/workbox-build/)
   *
   * Defaults to `GenerateSW` which will generate a service worker.
   */
  workbox?: InjectManifestOptions | GenerateSWOptions;
}

// Next build metadata files that should not be cached
const manifestExcludes = [
  "react-loadable-manifest.json",
  "build-manifest.json",
  /\.map$/,
];

export function serviceWorker(serviceWorkerConfig: ServiceWorkerConfig) {
  return function (nextConfig: NextConfig): NextConfig {
    return {
      ...nextConfig,
      webpack(config: Configuration, options: NextOptions): Configuration {
        if (!options.isServer) {
          config.plugins ??= [];
          config.plugins.push(
            new ServiceWorkerPlugin({
              ...serviceWorkerConfig,
              registration: {
                scope: nextConfig.basePath,
                ...serviceWorkerConfig.registration,
              },
              workbox: {
                exclude: manifestExcludes,
                swDest: join(cwd(), "public", "service-worker.js"),
                modifyURLPrefix: {
                  "static/": "_next/static/",
                },
                ...serviceWorkerConfig.workbox,
              },
            })
          );
        }
        if (nextConfig.webpack) {
          return nextConfig.webpack(config, options);
        }
        return config;
      },
    };
  };
}
