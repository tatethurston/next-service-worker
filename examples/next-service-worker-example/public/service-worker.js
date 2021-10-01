/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-a8376ddf'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "_next/static/chunks/f6078781a05fe1bcb0902d23dbbb2662c8d200b3.d2f93176d48c02ef0d22.js",
    "revision": null
  }, {
    "url": "_next/static/chunks/framework.4b1beca48388539e3889.js",
    "revision": null
  }, {
    "url": "_next/static/chunks/main-4c4947d5859ce64b82c9.js",
    "revision": null
  }, {
    "url": "_next/static/chunks/pages/_app-c889dc2093dbed9b0076.js",
    "revision": null
  }, {
    "url": "_next/static/chunks/pages/_error-3b249070694c6bf28b46.js",
    "revision": null
  }, {
    "url": "_next/static/chunks/pages/index-6fb4124646b909b7ddc3.js",
    "revision": null
  }, {
    "url": "_next/static/chunks/polyfills-aa54647e89713304033b.js",
    "revision": null
  }, {
    "url": "_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",
    "revision": null
  }, {
    "url": "_next/static/css/1356f0eb3f0270b7a910.css",
    "revision": null
  }, {
    "url": "_next/static/css/2b7dbf7d9ba0747d7843.css",
    "revision": null
  }, {
    "url": "_next/static/kStGcFkbTxR7xNYfBueUE/_buildManifest.js",
    "revision": "dfde44d99b763b6cf4bb7e20d20a6751"
  }, {
    "url": "_next/static/kStGcFkbTxR7xNYfBueUE/_ssgManifest.js",
    "revision": "abee47769bf307639ace4945f9cfd4ff"
  }], {});

}));
