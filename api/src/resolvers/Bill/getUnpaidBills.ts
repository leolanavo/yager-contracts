import { Context } from '@typings/Context';

interface Args {
  appliedClauseID: string;
}

export async function getUnpaidBills(
  _: any,
  args: Args,
  context: Context,
  ____: any
): Promise<any> {
  const { mongodb: mongo } = context;
  const { appliedClauseID } = args;

  const bills = await mongo.Contract.find({
    appliedClauseID,
    paymentDate: undefined
  });

  console.log(bills);

  return bills;
}