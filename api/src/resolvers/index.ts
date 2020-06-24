import { ApolloError } from 'apollo-server-koa';
import { IAppliedPayment } from 'src/db/mongo/models/AppliedPayment';
import { Context } from 'src/server';

interface CreateAppliedPaymentsArgs {
  name: string;
  email: string;
}

interface GetUserArgs {
  _id: string;
}

const resolvers: any = {
  Mutation: {
    async createUser(_: any, args: CreateAppliedPaymentsArgs, context: Context, ___: any): Promise<IAppliedPayment> {
      const { db: mongo, uuidv4 }: Context = context;
      const { name, email }: any = args;

      let payment: any = await mongo.AppliedPayment.findOne({ email });

      if (payment) {
        throw new ApolloError('Email already being user', '409');
      }

      payment = {
        _id: uuidv4(),
        name,
        email,
      };

      mongo.AppliedPayment.insertMany([payment])

      return payment;
    },
  },
  Query: {
    async getUser(_: any, args: GetUserArgs, context: Context, ___: any): Promise<IAppliedPayment> {
      const { db: mongo }: Context = context;
      const { _id }: any = args;

      const payment: IAppliedPayment | null = await mongo.AppliedPayment.findOne({ _id });

      if (!payment)
        throw new ApolloError(`Cannot find user with _id ${_id}`, '404');

      return payment;
    }
  }
};

export default resolvers;
