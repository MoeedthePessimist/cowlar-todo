// graphql/mutations.js
import { gql } from '@apollo/client';

export const ADD_TODO = gql`
  mutation AddTodo($task: String!) {
    addTodo(task: $task) {
      _id
      task
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      _id
      task
      completed
    }
  }
`;
