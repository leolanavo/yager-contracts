import { ContextFunction } from 'apollo-server-core';
import { Sequelize } from 'sequelize'
import { v4 } from 'uuid/interfaces';

import { MongoDBInterface } from '@typings/MongoDB';
import { PostgresInterface } from '@typings/Postgres';

export interface Hash {
  [key: string]: any;
}

export interface Context {
  ctx: Hash;
  uuidv4: v4;
  mongodb: MongoDBInterface;
  postgres: PostgresInterface;
  neo4j: any;
}

export type ServerContextFunction = ContextFunction<Hash, Context>;