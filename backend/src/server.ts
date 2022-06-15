import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config/config';
import mongo from './config/mongo';
import multerRoute from './routes/multer.route';
import classificationRoute from './routes/classification.route';

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

app.use(cors());
app.use(express.static('../public'));

/** Parse the body of the request */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
app.use('/api', multerRoute);
app.use('/api', classificationRoute);

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
