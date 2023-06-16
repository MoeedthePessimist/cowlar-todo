import { Schema, model } from 'mongoose';

import { ITodo } from '~/types';

const TodoSchema: Schema<ITodo> = new Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedTime: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TodoModel = model<ITodo>('Todo', TodoSchema);

export default TodoModel;
