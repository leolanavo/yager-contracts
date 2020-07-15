import { ContextFunction } from 'apollo-server-core';
import { Connection } from 'typeorm'
import { v4 } from 'uuid/interfaces';

import { MongoDBInterface } from '@typings/MongoDB';

export interface Hash {
  [key: string]: any;
}

export interface Context {
  ctx: Hash;
  uuidv4: v4;
  mongodb: MongoDBInterface;
  postgres: Connection;
  neo4j: any;
}

export type ServerContextFunction = ContextFunction<Hash, Context>;