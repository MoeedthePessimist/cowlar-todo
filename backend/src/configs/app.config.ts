import cors from 'cors';

import express, { Application } from 'express';

type CorsConfig = {
  origin: string;
  methods: string;
  preflightContinue: boolean;
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
  preflightContinue: false,
};

export const createApp = () => {
  const server = express();

  appConfig.cors(corsConfig);
  appConfig.json(server);
  appConfig.urlencoded(server);

  return server;
};
