import { ApolloError } from "apollo-server-koa";
import { Context } from "@typings/Context";

import User from "@postgres/models/User";

interface Args {
  userID: string;
  signature: string;
}

export async function addSignature(
  _: any,
  args: Args,
  ___: Context,
  ____: any,
): Promise<any> {
  const { userID, signature } = args;

  const user = await User.findOne({
    id: userID
  });

  if (!user)
    throw new ApolloError(`Could not find User with ${userID}`, '404');

  user.signature = signature;
  await User.save(user);

  return user.toJSON();
}