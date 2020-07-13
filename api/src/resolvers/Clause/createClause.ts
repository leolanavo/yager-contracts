import { Clause } from '@typings/Clause';
import { Context } from '@typings/Context';
import { PaymentModel } from '@typings/Payment';

interface Args {
  text: string,
  payment: PaymentModel,
  references: string[]
}

export async function createClause(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<Clause> {
  const { mongodb: mongo, uuidv4 }: Context = context;

  const _id = uuidv4();

  const clause: Clause = {
    _id,
    ...args
  }

  mongo.Clause.insertMany([clause]);

  return clause;
}
