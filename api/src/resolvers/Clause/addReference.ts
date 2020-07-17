import { Clause } from '@typings/Clause';
import { Context } from '@typings/Context';
import { ApolloError } from 'apollo-server-koa';

interface Args {
  clauseID: string,
  referencedClauseID: string,
}

export async function addReference(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<Clause> {
  const { mongodb: mongo }: Context = context;

  const clause = await mongo.Clause.findOne({
    _id: args.clauseID
  });

  const refClause = await mongo.Clause.findOne({
    _id: args.referencedClauseID
  });

  if (!clause)
    throw new ApolloError(`Clause with id ${args.clauseID} was not found`, '404');

  if (!refClause)
    throw new ApolloError(`Clause with id ${args.referencedClauseID} was not found`, '404');

  if (!clause.references)
    clause.references = [];

  if (clause.references.includes(args.referencedClauseID)) {
    clause.references.push(args.referencedClauseID);
    await clause.save();
  }

  return clause;
}