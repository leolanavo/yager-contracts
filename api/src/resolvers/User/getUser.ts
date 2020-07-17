import { ApolloError } from 'apollo-server-koa';
import { Context } from '@typings/Context';

import User from "@postgres/models/User";

interface Args {
  userID: string;
}

export async function getUser(
  _: any,
  args: Args,
  ___: Context,
  ____: any
): Promise<any> {
  const { userID } = args;

  const user = await User.findOne({
    id: userID
  });

  if (!user)
    throw new ApolloError(`Could not find user with id ${userID}`, '404');

  return user;
}