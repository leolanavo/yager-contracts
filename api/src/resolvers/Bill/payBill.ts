import { ApolloError } from 'apollo-server-koa';

import { Context } from '@typings/Context';

interface Args {
  billID: string;
}

export async function payBill(
  _: any,
  args: Args,
  context: Context,
  ____: any
): Promise<any> {
  const { mongodb: mongo } = context;
  const { billID } = args;

  const bill = await mongo.Bill.findOne({ _id: billID });

  if (!bill)
    throw new ApolloError(`Could not find Bill with id ${billID}`, '404');

  bill.paymentDate = Date.now().toString();
  await bill.save();

  return bill;
}