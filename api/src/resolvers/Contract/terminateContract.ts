import { ApolloError } from 'apollo-server-koa';
import { Context } from '@typings/Context';

import Party from "@postgres/models/Party";

interface Args {
  partyID: string;
  contractID: string;
}

const changeCompanyRating = `MATCH (a:Company)
WHERE a.party_id = $partyID
SET a.rating = a.rating + $points
RETURN a;`;

const changeUserRating = `MATCH (a:User)
WHERE a.party_id = $partyID
SET a.rating = a.rating + $points
RETURN a;`;

export async function terminateContract(
  _: any,
  args: Args,
  context: Context,
  ___: any,
): Promise<any> {
  const { mongodb: mongo, neo4j } = context;
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

  const penalizedPartyID = contract.mainParty === party.id
    ? contract.secondaryParty
    : contract.mainParty;

  const penalizedParty = await Party.findOne({
    id: penalizedPartyID
  });

  if (!penalizedParty)
    throw new ApolloError(`This error should not exist. Party not found id: ${penalizedPartyID} `, '500');

  if (penalizedParty.entity === "company") {
    await neo4j.driver
      .session({
        defaultAccessMode: "WRITE",
        database: "yager",
      })
      .run(changeCompanyRating, {
        partyID: penalizedPartyID,
        points: -150
      });
  } else {
    await neo4j.driver
      .session({
        defaultAccessMode: "WRITE",
        database: "yager",
      })
      .run(changeUserRating, {
        partyID: penalizedPartyID,
        points: -150
      });
  }

  contract.terminatedBy = partyID;
  contract.terminatedDate = Date.now().toString();
  await contract.save();

  return contract;
}