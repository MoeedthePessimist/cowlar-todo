import cors from 'cors';

import express, { Application } from 'express';

import apiRoutes from '~/routes';

type CorsConfig = {
  origin: string;
  methods: string;
  allowedHeaders: string[];
};

export const appConfig = {
  cors: (config: CorsConfig) => cors(config),
  json: (server: Application) => {
    server.use(express.json());
  },
  urlencoded: (server: Application) => {
    server.use(express.urlencoded({ extended: true }));
  },
};

const corsConfig: CorsConfig = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: [ 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'X-Access-Token' ],
};

export const createApp = () => {
  const server = express();

  server.use(appConfig.cors(corsConfig));
  appConfig.json(server);
  appConfig.urlencoded(server);

  server.use('/api', apiRoutes);

  return server;
};
