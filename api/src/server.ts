import Koa from 'koa';

import Cors from '@koa/cors';

import { ApolloServer } from 'apollo-server-koa';

import { GraphQLSchema } from 'graphql';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';

import uuidv4 from 'uuid/v4';

import postgres from '@postgres/postgres'
import neo4j from '@neo4j/neo4j';
import mongodb from '@mongodb/mongodb';
import resolvers from '@resolvers/resolvers';

import { Context, Hash, ServerContextFunction } from '@typings/Context';

const typeDefs: string = importSchema(`src/graphql/schema.graphql`);
const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });
const port: number = process.env.PORT ? +process.env.PORT : 3000;

const context: ServerContextFunction = ({ ctx }: Hash): Context => ({
  ctx,
  uuidv4,
  mongodb,
  postgres,
  neo4j,
});

const server: ApolloServer = new ApolloServer({
  schema,
  context,
});

const app: Koa = new Koa();
app.use(Cors());
server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});
