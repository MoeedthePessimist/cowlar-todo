import 'fast-text-encoding';

import mongoose from 'mongoose';
import request from 'supertest';
import dotenv from 'dotenv';

import { server } from '../main';
import { MONGO_CONNECTION_STRING } from '~/configs/database.config';

dotenv.config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(MONGO_CONNECTION_STRING);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe('GET /api/todos', () => {
  it('should return all todos', async () => {
    const res = await request(server).get('/api/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should return all todos with specific filters', async () => {
    const res = await request(server).get('/api/todos?filters[]=urgent');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

describe('POST /api/todos', () => {
  it('should create a new todo', async () => {
    const res = await request(server)
      .post('/api/todos')
      .send({
        task: 'This is a test task',
        completed: false,
        filters: ['urgent'],
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.task).toBe('This is a test task');
  });
});

describe('PATCH /api/todos/:id', () => {
  it('should update a todo', async () => {
    const res = await request(server).patch('/api/todos/6493dadea454a72dd1c2745e').send({
      completed: true,
      completedTime: new Date(),
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.task).toBe('This is a test task');
    expect(res.body.data.completed).toBe(true);
  });
});

describe('DELETE /api/todos/:id', () => {
  it('should delete a todo', async () => {
    const res = await request(server).delete('/api/todos/6493dd526003f06a37b13000');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.task).toBe('This is a test task');
    expect(res.body.data.completed).toBe(false);
  });
});
