import { Contract } from '@typings/Contract';
import { Context } from '@typings/Context';
import { ApolloError } from "apollo-server-koa";

interface Args {
  contractID: string;
  date: string;
  newEndDate: string;
}

export async function addExtension(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<Contract> {
  const { mongodb: mongo, uuidv4 }: Context = context;

  const _id = uuidv4();

  const extension: any = {
    _id,
    date: args.date,
    newEndDate: args.newEndDate
  };

  let contract = await mongo.Contract.findOne({ _id: args.contractID })

  if (!contract)
    throw new ApolloError(`Contract with id: ${args.contractID} was not found`, "404");


  contract = await mongo.Contract.updateOne(
    { _id: args.contractID },
    { $push: { extensions: extension } }
  )

  if (!contract)
    throw new ApolloError(`Could not update contract id: ${args.contractID}`, "500");

  return contract;
}