import Koa from 'koa';

import Cors from '@koa/cors';

import { ApolloServer } from 'apollo-server-koa';

import { GraphQLSchema } from 'graphql';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';

import uuidv4 from 'uuid/v4';

import postgres from 'src/db/postgres'
import neo4j from 'src/db/neo4j';
import mongodb, { DbConnection } from 'src/db/mongo/models';
import resolvers from 'src/resolvers';

import { ContextFunction } from 'apollo-server-core';
import { v4 } from 'uuid/interfaces';

interface Hash {
  [key: string]: any;
}

export interface Context {
  ctx: Hash;
  uuidv4: v4;
  mongodb: DbConnection;
  postgres: any;
  neo4j: any;
}

type ServerContextFunction = ContextFunction<Hash, Context>;

const port: number = process.env.PORT ? +process.env.PORT : 3000;

const typeDefs: string = importSchema(`src/graphql/schema.graphql`);

const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });

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
