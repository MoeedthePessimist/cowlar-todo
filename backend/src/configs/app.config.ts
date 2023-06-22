import cors from 'cors';

import express, { Application, NextFunction, Request, Response } from 'express';

import path from 'path';

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
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'X-Access-Token'],
};

export const createApp = () => {
  const server = express();

  server.use(appConfig.cors(corsConfig));
  appConfig.json(server);
  appConfig.urlencoded(server);

  // serve the react app files from the dist folder
  server.use(express.static(path.join(__dirname, '..', '..', 'dist')));

  server.use('/api', apiRoutes);

  //   serve the index.html from the dist folder
  server.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
  });

  return server;
};

export const setResponseHeader = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  next();
};
