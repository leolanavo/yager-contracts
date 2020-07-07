import { ApolloError } from 'apollo-server-koa';

import { Context } from '@typings/Context';

interface Args {
  name: string;
  cnpj: string;
}

export async function createCompany(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<any> {
  const { postgres }: Context = context;
  const { name, cnpj }: Args = args;


  let company = await postgres.Company.findOne({
    where: {
      cnpj
    }
  });

  if (company)
    throw new ApolloError(`CNPJ ${cnpj} already in use`, '409');

  company = await postgres.Company.create({
    name,
    cnpj,
    party_id: 2
  })

  if (!company)
    throw new ApolloError(`Company with CNPJ ${cnpj} could not be created`, '409');

  console.log(company);

  return company.toGraphQL();
}