import cors from 'cors';

import { ApolloServer } from 'apollo-server-express';

import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

import express, { Application, Express } from 'express';

import { resolvers, typeDefs } from '~/graphql';

type CorsConfig = {
  origin: string;
  methods: string;
  preflightContinue: boolean;
};

const resolverMap = () => ({
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value: unknown) {
      if (value instanceof Date) {
        return new Date(value); // value from the client
      }
      return null;
    },
    serialize(value: unknown) {
      if (value instanceof Date) {
        return value.getTime();
      }
      return null;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
});

export const appConfig = {
  cors: (config: CorsConfig) => cors(config),
  json: (server: Application) => {
    server.use(express.json());
  },
  urlencoded: (server: Application) => {
    server.use(express.urlencoded({ extended: true }));
  },
};

const corsConfig: CorsConfig = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

export const createApp = () => {
  const server = express();

  appConfig.cors(corsConfig);
  appConfig.json(server);
  appConfig.urlencoded(server);

  resolverMap();

  connectGraphServer(server);

  return server;
};

const connectGraphServer = async (server: Express) => {
  const graphServer = new ApolloServer({ typeDefs, resolvers });
  await graphServer.start();
  graphServer.applyMiddleware({ app: server, path: '/graphql' });
};
