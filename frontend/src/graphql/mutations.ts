// graphql/mutations.js
import { gql } from '@apollo/client';

export const ADD_TODO = gql`
  mutation AddTodo(
    $task: String!
    $completed: Boolean!
    $completedTime: Date!
    $createdAt: String!
    $filters: [String!]!
  ) {
    addTodo(
      task: $task
      completed: $completed
      completedTime: $completedTime
      createdAt: $createdAt
      filters: $filters
    ) {
      _id
      task
      completed
      completedTime
      createdAt
      filters
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($_id: ID!) {
    deleteTodo(_id: $_id)
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($_id: ID!, $completed: Boolean!, $completedTime: Date!) {
    updateTodo(_id: $id, completed: $completed, completedTime: $completedTime) {
      _id
      task
      completed
    }
  }
`;
