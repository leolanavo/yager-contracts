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
  }, {
    relations: ['party', 'companies']
  });

  const company = await Company.findOne({
    id: companyId,
  }, {
    relations: ['party', 'representatives']
  });

  if (!user)
    throw new ApolloError(`User with id ${userId} not found`, '404');

  if (!company)
    throw new ApolloError(`Company with id ${companyId} not found`, '404');

  const companies = await Promise.all(user.companies.map(c => {
    return Company.findOne({
      id: c.id
    }, {
      relations: ['party']
    });
  }));

  user.companies = companies as Company[];
  user.companies.push(company);
  await User.save(user);

  return user.toJSON();
}