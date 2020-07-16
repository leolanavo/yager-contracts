import { ApolloError } from 'apollo-server-koa';
import { Context } from '@typings/Context';

interface Args {
  contractID: string;
}

export async function getContract(
  _: any,
  args: Args,
  context: Context,
  ____: any
): Promise<any> {
  const { contractID } = args;
  const { mongodb: mongo } = context;

  const contract = mongo.Contract.findOne({
    _id: contractID
  });

  if (!contract)
    throw new ApolloError(`Could not find contract with id ${contractID}`, '404');

  return contract;
}