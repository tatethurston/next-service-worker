import { Workbox } from "workbox-window";

// eslint-disable-next-line no-undef
if ("serviceWorker" in navigator) {
  // eslint-disable-next-line no-undef
  const wb = new Workbox(__NEXT_SERVICE_WORKER_SW_DEST__, {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,no-undef
    scope: __NEXT_SERVICE_WORKER_SCOPE__,
  });
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  wb.register();
}
