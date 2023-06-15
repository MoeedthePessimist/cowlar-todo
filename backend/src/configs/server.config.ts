import dotenv from 'dotenv';

import { Express } from 'express';

dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT || 3000;

export const createServer = (server: Express) => {
  //connect the server to the SERVER_PORT
  server.listen(SERVER_PORT, () => {
    console.warn(`Server is listening on port ${SERVER_PORT}`);
  });
};
