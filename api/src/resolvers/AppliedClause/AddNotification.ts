import { ApolloError } from 'apollo-server-koa';

import { Context } from '@typings/Context';
import { Notification } from '@typings/Notification';

import { createBill } from '@resolvers/Bill';

interface Args {
  appliedClauseID: string;
}

export async function addNotification(
  _: any,
  args: Args,
  context: Context,
  ____: any,
): Promise<any> {
  const { appliedClauseID } = args;
  const { mongodb: mongo, uuidv4 } = context;

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

  if (appliedClause.numberNotifications === appliedClause.notifications.length) {
    createBill(_, { appliedClauseID: appliedClause.id }, context, null);
    return contract;
  }

  const notification: Notification = {
    _id: uuidv4(),
    date: Date.now().toString(),
  };

  const savedNotification =
    await mongo.Notification.insertMany([notification]);

  if (!contract.appliedClauses[clauseIndex].notifications)
    contract.appliedClauses[clauseIndex].notifications = [];

  contract.appliedClauses[clauseIndex].notifications.push(savedNotification[0]);

  await contract.save();

  return contract;
}