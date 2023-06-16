import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      _id
      task
      completed
      completedTime
      createdAt
    }
  }
`;
