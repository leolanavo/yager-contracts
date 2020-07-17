import { ApolloError } from 'apollo-server-koa';

import { Context } from '@typings/Context';

const MS_TO_DAY_RATE = 86_400_000;

interface Args {
  appliedClauseID: string;
}

export async function createBill(
  _: any,
  args: Args,
  context: Context,
  ____: any
): Promise<any> {
  const { mongodb: mongo, uuidv4 } = context;
  const { appliedClauseID } = args;

  const contract = await mongo.Contract.findOne({
    appliedClauses: {
      $elemMatch: {
        _id: appliedClauseID,
      }
    }
  });

  if (!contract)
    throw new ApolloError(`Could not find Contract containing an AplliedClause with id ${appliedClauseID}`, '404');

  const appliedClause =
    contract.appliedClauses.find(appClause => appClause._id === appliedClauseID);

  if (!appliedClause)
    throw new ApolloError('Error');

  const clause = await mongo.Clause.findOne({
    _id: appliedClause?.clauseID,
  });

  if (!clause)
    throw new ApolloError(`Could not find Clause refereced by AppliedClause with id ${appliedClauseID}`);

  const payment = clause.payment;
  const days = Math.floor((Date.now() - parseInt(appliedClause.date)) / MS_TO_DAY_RATE);

  const finalValue = payment.increments.reduce<number>((result, i) => {
    const cycles = Math.floor(days / i.period);
    const absoluteRate = i.absoluteRate ? i.absoluteRate * cycles : 0;
    const relativeRate = i.relativeRate ? payment.baseCharge * Math.pow((1 + i.relativeRate), cycles) : 0;
    return result + absoluteRate + relativeRate;
  }, payment.baseCharge);

  return await mongo.Bill.insertMany([{
    _id: uuidv4(),
    value: finalValue,
    chargeDate: Date.now().toString(),
    appliedClauseID,
  }]);
}