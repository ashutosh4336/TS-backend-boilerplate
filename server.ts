import express, { Application } from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import expressSession from 'express-session';
import morgan from 'morgan';

// Load ENV variable
dotenv.config({ path: `./src/config/config.env` });

// Import DB
import connectDB from './src/config/db';

// Import Middleware
import { userAgentCheck } from './src/middleware/userAgent';
import routeLoader from './src/middleware/router';
import errorHandler from './src/middleware/error';

const app: Application = express();

// CORS Middleware
enum BaseUrl {
  dev = 'http://127.0.0.1:3000',
  prod = '',
}
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? BaseUrl.prod : BaseUrl.dev,
  credentials: true,
};

app.use(cors(corsOptions));

// User AgnetCheck
app.use(userAgentCheck);

// ConnectDB
connectDB();

// Logging Middleware
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

const isCookieSecure: boolean =
  process.env.NODE_ENV === 'production' ? true : false;

app.use(
  expressSession({
    secret: `${process.env.SESSION_SECRET}`,
    name: '_sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 10 * 60 * 60 * 24 * 1000,
      secure: isCookieSecure,
      sameSite: false,
    },
  })
);

routeLoader(app);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `🚀 ` +
      colors.yellow.bold.underline(
        `Server started in ${process.env.NODE_ENV} on port ${PORT}`
      )
  );
});

// Handle Unhandled Rejection
process.on('unhandledRejection', (err: any, promise) => {
  console.log(
    colors.red.underline(`💥️ ` + `Unhanled Rejection Error:  ${err.message}`)
  );
  // Close Server and Exit
  server.close(() => process.exit(1));
});

process.on('SIGTERM', function (code) {
  console.log(
    '🤯️ ' + colors.red.underline('SIGTERM received...'),
    process.pid,
    code
  );
  server.close(function () {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  if (server.listening) {
    server.close(function (err) {
      if (err) {
        console.error(`🤯️ ` + colors.red.underline(` SIGINT received...`));
        process.exit(1);
      }
      process.exit(0);
    });
  }
});

export default app;
