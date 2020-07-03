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

// TODO: names and properties have to change
const resolvers: any = {
  Mutation: {
    async createUser(_: any, args: CreateAppliedPaymentsArgs, context: Context, ___: any): Promise<any> {
      const { neo4j }: Context = context;
      const { name }: any = args;

      console.log('hello')
      const x = await neo4j.session
        .run('MATCH (x:User) RETURN x;', {
          name,
        });

      x.records.forEach(y => console.log(y.get('x')));

      return "hello"
    },
    async createPayment(_: any, __: CreateAppliedPaymentsArgs, context: Context, ___: any): Promise<any> {
      const { mongodb: mongo, uuidv4 }: Context = context;

      const payment = {
        _id: uuidv4(),
      };

      mongo.AppliedPayment.insertMany([payment])

      return payment;
    },
    async createCompany(_: any, args: any, context: Context, ___: any): Promise<any> {
      const { postgres }: Context = context;
      const { name, cnpj }: any = args;

      var company = await postgres.Company.findOne({ cnpj })
      if (company)
        throw new ApolloError('CNPJ already in use', '409');

      company = await postgres.Company.create({
        name,
        cnpj,
        party_id: 2
      })

      return company.dataValues
    }
  },
  Query: {
    async getUser(_: any, args: GetUserArgs, context: Context, ___: any): Promise<IAppliedPayment> {
      const { mongodb: mongo }: Context = context;
      const { _id }: any = args;

      const payment: IAppliedPayment | null = await mongo.AppliedPayment.findOne({ _id });

      if (!payment)
        throw new ApolloError(`Cannot find user with _id ${_id}`, '404');

      return payment;
    }
  }
};

export default resolvers;
