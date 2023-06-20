import { gql } from '@apollo/client';

export const GET_ALL_TODOS = gql`
  query GetAllTodos($filters: [String!]!) {
    getAllTodos(filters: $filters) {
      _id
      task
      completed
      completedTime
      createdAt
      filters
    }
  }
`;
