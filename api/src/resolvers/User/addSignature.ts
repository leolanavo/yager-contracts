import { ApolloError } from "apollo-server-koa";
import { Context } from "@typings/Context";

import User from "@postgres/models/User";
import Company from "@postgres/models/Company";

interface Args {
  userID: string;
  signature: string;
}

export async function addSignature(
  _: any,
  args: Args,
  ___: Context,
  ____: any
): Promise<any> {
  const { userID, signature } = args;

  const user = await User.findOne(
    {
      id: userID,
    },
    {
      relations: ["party", "companies"],
    }
  );

  if (!user) throw new ApolloError(`Could not find User with ${userID}`, "404");

  const companies = await Promise.all(
    user.companies.map((c) => {
      return Company.findOne(
        {
          id: c.id,
        },
        {
          relations: ["party"],
        }
      );
    })
  );

  user.companies = companies as Company[];
  user.signature = signature;
  await User.save(user);

  return user.toJSON();
}
