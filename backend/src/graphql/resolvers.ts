import { Todo } from '~/models';

import { formatDate } from '~/utils/format-date';

const resolvers = {
  Query: {
    todos: async () => {
      try {
        const todos = await Todo.find();
        return todos;
      } catch (error) {
        throw new Error('Error fetching todos');
      }
    },
  },
  Mutation: {
    createTodo: async (_, { Task }) => {
      try {
        const newTodo = new Todo({
          Task,
          Completed: false,
          CreationTime: new Date(),
        });
        const savedTodo = await newTodo.save();
        return savedTodo;
      } catch (error) {
        throw new Error('Error creating todo');
      }
    },
    updateTodo: async (_, { _id, Completed, CompletedTime }) => {
      try {
        const updatedTodo = await Todo.findByIdAndUpdate(
          _id,
          {
            Completed,
            CompletedTime,
          },
          { new: true },
        );
        return updatedTodo;
      } catch (error) {
        throw new Error('Error updating todo');
      }
    },
    deleteTodo: async (_, { _id }) => {
      try {
        const deletedTodo = await Todo.findByIdAndRemove(_id);
        return deletedTodo;
      } catch (error) {
        throw new Error('Error deleting todo');
      }
    },
  },
  Todo: {
    CompletedTime: (parent) => {
      return parent.Completed ? formatDate(parent.CompletedTime) : null;
    },
    CreationTime: (parent) => {
      return formatDate(parent.CreationTime);
    },
  },
};

module.exports = resolvers;
