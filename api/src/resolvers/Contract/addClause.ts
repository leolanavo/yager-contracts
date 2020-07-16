import { ApolloError } from 'apollo-server-koa';
import { Context } from '@typings/Context';

import { ClauseInput } from '@typings/Clause';
import { inputToClause, clauseToAppliedClause } from 'src/utils/clausesTransforms';

interface Args {
  contractId: string;
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
  const { contractId, clause, startDate } = args;

  const contract = await mongo.Contract.findOne({
    _id: contractId
  });

  if (!contract)
    throw new ApolloError(`Contract with id ${contractId}`, '404');

  const finalClause = inputToClause(clause, uuidv4);

  await mongo.Clause.insertMany([finalClause]);

  await mongo.Contract.updateOne(
    { _id: contractId },
    { $push: { appliedClauses: clauseToAppliedClause(clause, uuidv4, startDate) } }
  );

  return await mongo.Contract.findOne({ _id: contractId });
}