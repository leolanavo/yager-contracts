// import { ApolloError } from 'apollo-server-koa';

import { Context } from "@typings/Context";

interface Args {
  name: string;
  segment: string;
}

const cypherQuery =
  "MATCH (u:User {name: $name}) - [:IN_CONTRACT*1..5] -> (c:Company) - [:COMPANY_SEGMENT] -> (s:Segment {name: $segment}) WITH c MATCH (c) - [r:IN_CONTRACT] - (d) WITH c, count(*) as numberOfContracts WITH c, MAX(numberOfContracts) as max_contracts RETURN c.name as Company, max_contracts as `Number of Contracts`;";

export async function getBestRatedCompaniesBySegment(
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
