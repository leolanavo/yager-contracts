import { ApolloError } from 'apollo-server-koa';

import { AppliedPayment } from '@typings/AppliedPayment';
import { Context } from '@typings/Context';

interface Args {
  id: string
}

export async function getPayment(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<AppliedPayment> {
  const { mongodb: mongo }: Context = context;
  const { id } = args;

  const payment: AppliedPayment | null = await mongo.AppliedPayment.findOne({ _id: id });

  if (!payment)
    throw new ApolloError(`Cannot find payment with id: ${id}`, '404');

  return payment;
}
