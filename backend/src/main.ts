import { Express } from 'express';

import { createApp, connectToDatabase, createServer } from '~/configs';

export const server: Express = createApp();

connectToDatabase();

createServer(server);
