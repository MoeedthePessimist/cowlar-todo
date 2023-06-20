import { Todo } from '~/models';
import { ITodo } from '~/types';

import { formatDate } from '~/utils/format-date';

export const resolvers = {
  Query: {
    getAllTodos: async (_: ITodo, { filters }: { filters: string[] }) => {
      try {
        if (filters && filters.length > 0) {
          const filteredTodos = await Todo.find({ filters });
          return filteredTodos;
        }
        const todos = await Todo.find();
        if (!todos) { 
          return null;
        }
        return todos;
      } catch (error) {
        throw new Error('Error fetching todos');
      }
    },
  },
  Mutation: {
    createTodo: async (
      _: ITodo,
      {
        task,
        completed,
        completedTime,
        createdAt,
        filters,
      }: { task: string; completed: boolean; completedTime: Date; createdAt: Date; filters: string[] },
    ) => {
      console.log('task', task);
      try {
        const newTodo = new Todo({
          task,
          completed,
          completedTime,
          createdAt,
          filters,
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
