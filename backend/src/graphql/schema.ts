import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

  type Todo {
    _id: ID!
    task: String!
    completed: Boolean!
    completedTime: String!
    createdAt: Date!
  }

  type Query {
    getTodoById(_id: ID!): Todo!
    getAllTodos: [Todo!]!
  }

  type Mutation {
    createTodo(Task: String!): Todo!
    updateTodo(_id: ID!, completed: Boolean!, completedTime: String!, task: String!): Todo!
    deleteTodo(_id: ID!): Todo!
  }
`;
