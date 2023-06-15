import dotenv from 'dotenv';

import mongoose from 'mongoose';

dotenv.config();

export const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || '';

export const connectToDatabase = () => {
  mongoose.connect(MONGO_CONNECTION_STRING);

  const database = mongoose.connection;

  database.on('error', (error) => {
    console.error(`Error connecting to database: ${error}`);
  });

  database.once('open', () => {
    console.warn('Connected to database');
  });
};
