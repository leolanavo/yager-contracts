import { Context } from '@typings/Context';
import { Notification } from '@typings/Notification';
import { ApolloError } from 'apollo-server-koa';

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

  const appliedClause = await mongo.AppliedClause.findOne({
    _id: appliedClauseID,
  });

  if (!appliedClause)
    throw new ApolloError(`Could not find AppliedClause with id ${appliedClauseID}`, '404');

  const notification: Notification = {
    _id: uuidv4(),
    date: Date.now().toString(),
  };

  const savedNotification =
    await mongo.Notification.insertMany([notification]);

  if (!appliedClause.notifications)
    appliedClause.notifications = [];

  appliedClause.notifications.push(savedNotification[0]);

  await appliedClause.save();
}