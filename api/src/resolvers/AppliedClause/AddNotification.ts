import { ApolloError } from 'apollo-server-koa';

import { Context } from '@typings/Context';
import { Notification } from '@typings/Notification';

import { createBill } from '@resolvers/Bill';
import Party from "@postgres/models/Party";

interface Args {
  appliedClauseID: string;
}

const changeCompanyRating = `MATCH (a:Company)
WHERE a.party_id = $partyID
SET a.rating = a.rating + $points
RETURN a;`;

const changeUserRating = `MATCH (a:User)
WHERE a.party_id = $partyID
SET a.rating = a.rating + $points
RETURN a;`;

export async function addNotification(
  _: any,
  args: Args,
  context: Context,
  ____: any,
): Promise<any> {
  const { appliedClauseID } = args;
  const { mongodb: mongo, uuidv4, neo4j } = context;

  const contract = await mongo.Contract.findOne({
    appliedClauses: {
      $elemMatch: {
        _id: appliedClauseID,
      }
    }
  });

  if (!contract)
    throw new ApolloError(`Could not find Contract containing an AplliedClause with id ${appliedClauseID}`, '404');

  const clauseIndex = contract.appliedClauses.findIndex(appClause => appClause._id === appliedClauseID)
  const appliedClause = contract.appliedClauses[clauseIndex];

  if (!contract.appliedClauses[clauseIndex].notifications)
    contract.appliedClauses[clauseIndex].notifications = [];

  if (appliedClause.numberNotifications === appliedClause.notifications.length) {
    createBill(_, { appliedClauseID: appliedClause.id }, context, null);
    return contract;
  }

  const penalizedParty = await Party.findOne({
    id: contract.secondaryParty
  });

  if (penalizedParty?.entity === "company") {
    await neo4j.driver
      .session({
        defaultAccessMode: "WRITE",
        database: "yager",
      })
      .run(changeCompanyRating, {
        partyID: penalizedParty.id,
        points: -10
      });
  } else {
    await neo4j.driver
      .session({
        defaultAccessMode: "WRITE",
        database: "yager",
      })
      .run(changeUserRating, {
        partyID: penalizedParty?.id,
        points: -10
      });
  }

  const notification: Notification = {
    _id: uuidv4(),
    date: Date.now().toString(),
  };

  const savedNotification =
    await mongo.Notification.insertMany([notification]);

  contract.appliedClauses[clauseIndex].notifications.push(savedNotification[0]);

  await contract.save();

  return contract;
}