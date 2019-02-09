import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import controllers from './controllers';
import {} from 'dotenv/config';

const app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
  exposedHeaders: process.env.CORS_HEADERS.split(','),
}));

app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT,
}));

// connect to db
initializeDb((db) => {
  // internal middleware
  app.use(middleware());

  // api router
  app.use('/', controllers(db));

  app.server.listen(process.env.PORT || 8080, () => {
    console.log(`Started on port ${app.server.address().port}`);
  });
});

export default app;
