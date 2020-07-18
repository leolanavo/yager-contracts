import { Context } from '@typings/Context';

interface Args {
  appliedClauseID: string;
}

export async function unpaidBills(
  _: any,
  args: Args,
  context: Context,
  ____: any
): Promise<any> {
  const { mongodb: mongo, uuidv4 } = context;
  const { appliedClauseID } = args;

  const bills = await mongo.Contract.findMany({
    appliedClauseID,
    paymentDate: undefined
  });

  console.log(bills);

  return bills;
}