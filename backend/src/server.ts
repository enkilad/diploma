import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import mongo from './config/mongo';
import documentRoute from './routes/route';
import cors from 'cors';

const NAMESPACE = 'Server';
const app = express();

/** Mongo */
mongoose
  .connect(mongo.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo Connected');
  })
  .catch((error) => {
    console.error(error, error.message, error);
  });

/** Log the request */
app.use((req, res, next) => {
  /** Log the req */

  res.on('finish', () => {
    /** Log the res */
  });

  next();
});

app.use(cors());
/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of our API */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

/** Routes go here */
app.use('/api', documentRoute);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () =>
  console.info(
    NAMESPACE,
    `\nServer is running ${config.server.hostname}:${config.server.port}`
  )
);
