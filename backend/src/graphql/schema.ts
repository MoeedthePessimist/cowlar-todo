import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

  type Todo {
    _id: ID!
    task: String!
    completed: Boolean!
    completedTime: Date!
    createdAt: Date!
    filters: [String!]!
  }

  type Query {
    getAllTodos(filters: [String!]!): [Todo!]!
  }

  type Mutation {
    createTodo(task: String!, completed: Boolean!, completedTime: Date!, createdAt: Date, filters: [String!]): Todo!
    updateTodo(_id: ID!, completed: Boolean!, completedTime: Date!): Todo!
    deleteTodo(_id: ID!): Todo!
  }
`;
