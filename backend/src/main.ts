import { Express } from 'express';

import { createApp, connectToDatabase, createServer } from './configs/index';

const server: Express = createApp();

connectToDatabase();

createServer(server);
