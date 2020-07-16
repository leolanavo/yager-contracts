import { ApolloError } from 'apollo-server-koa';
import { Context } from '@typings/Context';

import Party from "@postgres/models/Party";

interface Args {
  partyID: string;
  contractID: string;
}

export async function terminateContract(
  _: any,
  args: Args,
  context: Context,
  ___: any,
): Promise<any> {
  const { mongodb: mongo } = context;
  const { partyID, contractID } = args;

  const party = await Party.findOne({
    id: partyID
  });

  const contract = await mongo.Contract.findOne({
    _id: contractID
  });

  if (!party)
    throw new ApolloError(`Party with id ${partyID} could not be found`, '404');

  if (!contract)
    throw new ApolloError(`Contract with id ${contractID} could not be found`, '404');

  if (contract.terminatedBy)
    throw new ApolloError(`Contract with id ${contractID} is already terminated`, '422');

  if (partyID !== contract.mainParty && partyID !== contract.secondaryParty)
    throw new ApolloError(
      `Party with id ${partyID} is not present in contract with id ${contractID}`,
      '422'
    );

  // TODO: penalize party
  // const penalizedPartyID = contract.mainParty === party.id
  //   ? contract.secondaryParty
  //   : contract.mainParty;

  // const penalizedParty = await Party.findOne({
  //   id: penalizedPartyID
  // });

  contract.terminatedBy = partyID;
  contract.terminatedDate = Date.now().toString();
  await contract.save();

  return contract;
}