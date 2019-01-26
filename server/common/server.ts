import express from 'express';
import { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import swaggerify from './swagger';
import l from './logger';

import 'reflect-metadata';
import { createConnection } from 'typeorm';

const app = express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb'
      })
    );
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
  }

  createDatabaseConnection = (): ExpressServer => {
    createConnection()
      .then(connection => {
        console.log('Database connection has been established');
        console.log(connection);
      })
      .catch(error => {
        l.error('There was an error establishing the database connection');
        l.error(error);
        setTimeout(this.createDatabaseConnection, 10000);
      });

    return this;
  };

  router = (routes: (app: Application) => void): ExpressServer => {
    swaggerify(app, routes);
    return this;
  };

  listen = (p: string | number = process.env.PORT): Application => {
    const welcome = (port: number | string) => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          'development'} @: ${os.hostname()} on port: ${port}}`
      );
    http.createServer(app).listen(p, welcome(p));
    return app;
  };
}
