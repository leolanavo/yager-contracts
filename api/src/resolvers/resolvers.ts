import { IResolvers } from 'apollo-server-koa';

import { createCompany } from '@resolvers/Company';
import { createPayment, getPayment } from '@resolvers/AppliedPayment';
import { createUser } from '@resolvers/User';

const resolvers: IResolvers = {
  Mutation: {
    createCompany,
    createPayment,
    createUser,
  Query: {
    getPayment,
  }
};

export default resolvers;
