import { ApolloError } from 'apollo-server-koa';
import { Context } from '@typings/Context';

import { ClauseInput } from '@typings/Clause';
import { inputToClause, clauseToAppliedClause } from '@utils/clausesTransforms';

interface Args {
  contractID: string;
  startDate: string;
  clause: ClauseInput;
}

export async function addClause(
  _: any,
  args: Args,
  context: Context,
  ____: any
): Promise<any> {
  const { mongodb: mongo, uuidv4 } = context;
  const { contractID, clause, startDate } = args;

  const contract = await mongo.Contract.findOne({
    _id: contractID
  });

  if (!contract)
    throw new ApolloError(`Contract with id ${contractID}`, '404');

  const finalClause = inputToClause(clause, uuidv4);

  await mongo.Clause.insertMany([finalClause]);

  await mongo.Contract.updateOne(
    { _id: contractID },
    { $push: { appliedClauses: clauseToAppliedClause(finalClause, uuidv4, startDate) } }
  );

  return await mongo.Contract.findOne({ _id: contractID });
}