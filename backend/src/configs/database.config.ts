import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || 'http://localhost:27017/cowlar';

export const MONGO_CONNECTION_STRING_TEST =
  process.env.MONGO_CONNECTION_STRING_TEST || 'http://localhost:27017/cowlar-test';

export const connectToDatabase = () => {
  try {
    mongoose.connect(MONGO_CONNECTION_STRING);

    const database = mongoose.connection;

    database.on('error', (error) => {
      console.error(`Error connecting to database: ${error}`);
    });

    database.once('open', () => {
      console.warn('Connected to database');
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};
