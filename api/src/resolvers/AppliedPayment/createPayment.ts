import { AppliedPayment } from '@typings/AppliedPayment';
import { Context } from '@typings/Context';

interface Args {
  baseValue: number;
  type: string;
  dueDate: string;
}

export async function createPayment(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<AppliedPayment> {
  const { mongodb, uuidv4 }: Context = context;

  const payment: AppliedPayment = {
    _id: uuidv4(),
    ...args,
  };

  mongodb.AppliedPayment.insertMany([payment]);

  return payment;
}