/*// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";


Sentry.init({
  dsn: "https://c52bffecceb99ba05340f533d9500c35@o4508720709107712.ingest.de.sentry.io/4508720713498704",
  enabled: process.env.NODE_ENV === "production", // Disable in dev mode

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
*/