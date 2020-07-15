import { ApolloError } from "apollo-server-koa";

import User from "@postgres/models/User";
import Company from "@postgres/models/Company";

interface Args {
  userId: string;
  companyId: string;
}

export async function addRepresentation(
  _: any,
  args: Args,
  ___: any,
  ____: any,
): Promise<any> {
  const { userId, companyId } = args;

  const user = await User.findOne({
    id: userId,
  });

  const company = await Company.findOne({
    id: companyId,
  });

  if (!user)
    throw new ApolloError(`User with id ${userId} not found`, '404');

  if (!company)
    throw new ApolloError(`Company with id ${companyId} not found`, '404');

  user.companies.push(company);
  await User.save(user);

  return user.toJSON();
}