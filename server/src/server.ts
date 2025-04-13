import { AuthChecker } from './../node_modules/type-graphql/build/typings/typings/auth-checker.d';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { mergeSchemas } from '@graphql-tools/schema';
import { buildSchema } from 'type-graphql';
const PORT = 3000;
const app = express();

const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const typeGraphQLSchema = await buildSchema({
  resolvers:[]
  emitSchemaFile: true,
});
