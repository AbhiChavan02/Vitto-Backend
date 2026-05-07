const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const applicationRoutes = require(
  './routes/applicationRoutes'
);

const errorMiddleware = require(
  './middleware/errorMiddleware'
);

const notFoundMiddleware = require(
  './middleware/notFoundMiddleware'
);

const limiter = require(
  './middleware/rateLimiter'
);

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(helmet());

app.use(morgan('dev'));

app.use(express.json());

app.use(limiter);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Vitto Lending API Running',
  });
});

app.use(
  '/api/v1/applications',
  applicationRoutes
);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

module.exports = app;