import { IResolvers } from 'apollo-server-koa';
import { Context } from '@typings/Context';

import { createCompany } from '@resolvers/Company';
import { createPayment, getPayment } from '@resolvers/AppliedPayment';


const resolvers: IResolvers = {
  Mutation: {
    createCompany,
    createPayment,
    async createUser(_: any, args: any, context: Context, ___: any): Promise<any> {
      const { neo4j }: Context = context;
      const { name }: any = args;

      const x = await neo4j.session
        .run('MATCH (x:User) RETURN x;', {
          name,
        });

      x.records.forEach(y => console.log(y.get('x')));

      return "hello"
    },
  },
  Query: {
    getPayment,
  }
};

export default resolvers;
