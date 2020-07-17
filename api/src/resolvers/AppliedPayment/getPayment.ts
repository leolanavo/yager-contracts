import { ApolloError } from 'apollo-server-koa';

import { Bill } from '@typings/Bill';
import { Context } from '@typings/Context';

interface Args {
  id: string
}

export async function getPayment(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<Bill> {
  const { mongodb: mongo }: Context = context;
  const { id } = args;

  const payment: Bill | null = await mongo.Bill.findOne({ _id: id });

  if (!payment)
    throw new ApolloError(`Cannot find payment with id: ${id}`, '404');

  return payment;
}
