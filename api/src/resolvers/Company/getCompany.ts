import { ApolloError } from 'apollo-server-koa';
import { Context } from '@typings/Context';

import Company from "@postgres/models/Company";

interface Args {
  companyID: string;
}

export async function getCompany(
  _: any,
  args: Args,
  ___: Context,
  ____: any
): Promise<any> {
  const { companyID } = args;

  const company = await Company.findOne({
    id: companyID
  });

  if (!company)
    throw new ApolloError(`Could not find Company with id ${companyID}`, '404');

  return company;
}