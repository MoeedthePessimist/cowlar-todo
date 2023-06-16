import { Todo } from '~/models';
import { ITodo } from '~/types';

import { formatDate } from '~/utils/format-date';

export const resolvers = {
  Query: {
    getTodoById: async (_: unknown, { _id }: { _id: string }) => {
      try {
        return await Todo.findById(_id);
      } catch (error) {
        throw new Error('Error fetching todo');
      }
    },

    getAllTodos: async () => {
      try {
        const todos = await Todo.find();
        return todos;
      } catch (error) {
        throw new Error('Error fetching todos');
      }
    },
  },
  Mutation: {
    createTodo: async (_: unknown, { task }: { task: string }) => {
      try {
        const newTodo = new Todo({
          task,
          completed: false,
          creationTime: new Date(),
        });
        const savedTodo = await newTodo.save();
        return savedTodo;
      } catch (error) {
        throw new Error('Error creating todo');
      }
    },
    updateTodo: async (
      _: ITodo,
      {
        _id,
        completed,
        completedTime,
        task,
      }: {
        _id: string;
        completed: boolean;
        completedTime: Date;
        task: string;
      },
    ) => {
      try {
        const updatedTodo = await Todo.findByIdAndUpdate(
          _id,
          {
            $set: {
              task,
              completed,
              completedTime,
            },
          },
          { new: true },
        );
        return updatedTodo;
      } catch (error) {
        throw new Error('Error updating todo');
      }
    },
    deleteTodo: async (_: ITodo, { _id }: { _id: string }) => {
      try {
        const deletedTodo = await Todo.findByIdAndRemove(_id);
        return deletedTodo;
      } catch (error) {
        throw new Error('Error deleting todo');
      }
    },
  },
  Todo: {
    completedTime: (parent: ITodo) => {
      return parent.completed ? formatDate(parent.completedTime) : null;
    },
    createdAt: (parent: ITodo) => {
      return formatDate(parent.createdAt);
    },
  },
};

module.exports = resolvers;
