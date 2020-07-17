import { Bill } from '@typings/Bill';
import { Context } from '@typings/Context';

interface Args {
  extraCharge: number,
  chargeDate: string,
  paymentDate: string
}

export async function createPayment(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<Bill> {
  const { mongodb, uuidv4 }: Context = context;

  const payment: Bill = {
    _id: uuidv4(),
    ...args,
  };

  mongodb.Bill.insertMany([payment]);

  return payment;
}