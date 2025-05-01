import "./instrument.js";
import express from "express";
import userRouter from './routes/users.js';
import reviewRouter from './routes/reviews.js';
import loginRouter from './routes/login.js';
import propertyRouter from './routes/properties.js';
import hostRouter from './routes/hosts.js';
import bookingRouter from './routes/bookings.js';
import amenityRouter from './routes/amenities.js';
import log from './middleware/logMiddleware.js';
import errorHandler from "./middleware/errorHandler.js";

import { PrismaClient } from './generated/prisma/client.js';
import * as Sentry from '@sentry/node';
import 'dotenv/config';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(log);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// app.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });

app.use('/users', userRouter);
app.use('/reviews', reviewRouter);
app.use('/login', loginRouter);
app.use('/properties', propertyRouter);
app.use('/hosts', hostRouter);
app.use('/bookings', bookingRouter);
app.use('/amenities', amenityRouter);
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
// The error handler must be before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.use(errorHandler);

const server = app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// Gracefully shutdown Prisma on exit
const gracefulShutdown = async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

// Handle kill signals
process.on('SIGINT', gracefulShutdown); // Ctrl+C
process.on('SIGTERM', gracefulShutdown); // kill command