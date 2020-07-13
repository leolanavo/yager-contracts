// import { ApolloError } from 'apollo-server-koa';

import { Context } from "@typings/Context";

interface Args {
  name: string;
  segment: string;
}

const cypherQuery =
  "MATCH (u:User {name: $name}) - [:IN_CONTRACT*1..5] -> (c:Company), (c) - [:COMPANY_SEGMENT] -> (s:Segment) return c.name as Company, collect(s.name) as Segments";

export async function getRelatedCompanies(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<any> {
  const { neo4j }: Context = context;
  const { name, segment } = args;

  const response = await neo4j.session.run(cypherQuery, {
    name,
    segment,
  });

  return response.records;
}
