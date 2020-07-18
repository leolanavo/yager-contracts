import { Contract } from '@typings/Contract';
import { Context } from '@typings/Context';
import { ApolloError } from "apollo-server-koa";
import Party from "@postgres/models/Party";

interface Args {
  contractID: string;
  date: string;
  newEndDate: string;
}

const changeCompanyRating = `MATCH (a:Company)
WHERE a.party_id = $partyID
SET a.rating = a.rating + $points
RETURN a;`;

const changeUserRating = `MATCH (a:User)
WHERE a.party_id = $partyID
SET a.rating = a.rating + $points
RETURN a;`;

export async function addExtension(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<Contract> {
  const { mongodb: mongo, uuidv4, neo4j }: Context = context;

  const _id = uuidv4();

  const extension: any = {
    _id,
    date: args.date,
    newEndDate: args.newEndDate
  };

  let contract = await mongo.Contract.findOne({ _id: args.contractID })


  if (!contract)
    throw new ApolloError(`Contract with id: ${args.contractID} was not found`, "404");


  await mongo.Contract.updateOne(
    { _id: args.contractID },
    { $push: { extensions: extension } }
  )

  contract = await mongo.Contract.findOne({ _id: args.contractID })

  if (!contract)
    throw new ApolloError(`Could not update contract id: ${args.contractID}`, "500");

  [contract.mainParty, contract.secondaryParty].forEach(async penalizedPartyID => {

    const penalizedParty = await Party.findOne({
      id: penalizedPartyID
    });

    if (penalizedParty?.entity === "company") {
      await neo4j.driver
        .session({
          defaultAccessMode: "WRITE",
          database: "yager",
        })
        .run(changeCompanyRating, {
          partyID: penalizedParty.id,
          points: 75
        });
    } else {
      await neo4j.driver
        .session({
          defaultAccessMode: "WRITE",
          database: "yager",
        })
        .run(changeUserRating, {
          partyID: penalizedParty?.id,
          points: 75
        });
    }
  });

  return contract;
}