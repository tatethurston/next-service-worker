import { join } from "path";
import type { Configuration, DefinePlugin } from "webpack";
import { cwd } from "process";
import {
  ServiceWorkerPlugin,
  type ServiceWorkerConfig,
} from "service-worker-webpack";

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

// Next build metadata files that should not be cached
const manifestExcludes = [
  "react-loadable-manifest.json",
  "build-manifest.json",
  /\.map$/,
];

export function serviceWorker(serviceWorkerConfig: ServiceWorkerConfig = {}) {
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
            }),
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
