import express, { Application, Request, Response, NextFunction } from 'express';
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
import { userAgentCheck, checkReqType } from './src/middleware/userAgent';
import routeLoader from './src/middleware/router';
import errorHandler from './src/middleware/error';

const app: Application = express();

app.use(express.json());

// CORS Middleware
enum BaseUrl {
  dev = 'http://127.0.0.1:3000',
  prod = 'https://yourdomain.com',
}

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? BaseUrl.prod : BaseUrl.dev,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(userAgentCheck);
app.use(checkReqType);
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

// All Router
routeLoader(app);
// Error Handler Middleware
app.use(errorHandler);

//Handle 404
// No Route Should Go Ubder this Block
app.use(function (req: Request, res: Response, next: NextFunction) {
  return res.status(404).json({
    success: false,
    code: 404,
    message: 'No Resource Found',
  });
});

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
  server.close(() => process.exit(1));
});

process.on('uncaughtException', function (err) {
  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Something Bad Happened... Please retry again later',
    });
  });
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
