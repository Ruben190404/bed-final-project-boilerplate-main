import 'dotenv/config';
import * as Sentry from '@sentry/node';
import express from 'express';

const app = express();

Sentry.init({
    dsn: "https://7807dfdc286b90088fd4e7ca7def3aba@o4509127753531392.ingest.de.sentry.io/4509247963791440",
    integrations: [
      // enable HTTP calls tracing
      Sentry.httpIntegration({app}),
      Sentry.expressIntegration({app}),
      // enable Express.js middleware tracing
      // Automatically instrument Node.js libraries and frameworks
    ],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});