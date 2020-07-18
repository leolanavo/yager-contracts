import { ApolloError } from 'apollo-server-koa';

import { Context } from '@typings/Context';
import Party from "@postgres/models/Party";

interface Args {
  billID: string;
}

const changeCompanyRating = `MATCH (a:Company)
WHERE a.party_id = $partyID
SET a.rating = a.rating + $points
RETURN a;`;

const changeUserRating = `MATCH (a:$User)
WHERE a.party_id = $partyID
SET a.rating = a.rating + $points
RETURN a;`;

export async function payBill(
  _: any,
  args: Args,
  context: Context,
  ____: any
): Promise<any> {
  const { mongodb: mongo, neo4j } = context;
  const { billID } = args;

  const bill = await mongo.Bill.findOne({ _id: billID });

  if (!bill)
    throw new ApolloError(`Could not find Bill with id ${billID}`, '404');

  const contract = await mongo.Contract.findOne({
    appliedClauses: {
      $elemMatch: {
        _id: bill.appliedClauseID,
      }
    }
  });

  if (!contract)
    throw new ApolloError(`Could not find Contract containing an AplliedClause with id ${bill.appliedClauseID}`, '404');

  const penalizedParty = await Party.findOne({
    id: contract.secondaryParty
  });

  bill.paymentDate = Date.now().toString();
  await bill.save();

  const appliedClause = await contract.appliedClauses.find(clause => clause._id === bill.appliedClauseID);
  if (bill.paymentDate > bill.chargeDate + appliedClause?.delayTolerance) {

    if (penalizedParty?.entity === "company") {
      await neo4j.driver
        .session({
          defaultAccessMode: "WRITE",
          database: "yager",
        })
        .run(changeCompanyRating, {
          partyID: penalizedParty.id,
          points: -25
        });
    } else {
      await neo4j.driver
        .session({
          defaultAccessMode: "WRITE",
          database: "yager",
        })
        .run(changeUserRating, {
          partyID: penalizedParty?.id,
          points: -25
        });
    }
  }
  else {
    if (penalizedParty?.entity === "company") {
      await neo4j.driver
        .session({
          defaultAccessMode: "WRITE",
          database: "yager",
        })
        .run(changeCompanyRating, {
          partyID: penalizedParty.id,
          points: 10
        });
    } else {
      await neo4j.driver
        .session({
          defaultAccessMode: "WRITE",
          database: "yager",
        })
        .run(changeUserRating, {
          partyID: penalizedParty?.id,
          points: 10
        });
    }
  }

  return bill;
}