import { Express } from 'express';

import { createApp, connectToDatabase, createServer } from '~/configs';

const server: Express = createApp();

connectToDatabase();

createServer(server);
