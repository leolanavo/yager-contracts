// import { ApolloError } from 'apollo-server-koa';

import { Context } from "@typings/Context";

interface Args {
  name: string;
  segment: string;
}

const cypherQuery = `MATCH 
  (u:User {name: $name}) - [:IN_CONTRACT*1..5] -> (c:Company) - [:COMPANY_SEGMENT] -> 
  (s:Segment {name: $segment}) WITH c MATCH (c) - [r:IN_CONTRACT] - (d) 
WITH c, count(*) as numberOfContracts WITH c, MAX(numberOfContracts) as max_contracts 
RETURN c.name as Company, max_contracts as \`Number of Contracts\`;
`;

export async function getRelatedCompanyBySegmentWithMoreContracts(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<any> {
  const { neo4j }: Context = context;
  const { name, segment } = args;

  const result = await neo4j.driver
    .session({
      defaultAccessMode: "WRITE",
      database: "yager",
    })
    .run(cypherQuery, {
      name,
      segment,
    });

  const response = {
    id: "",
    cpnj: "",
    name: "",
    segments: [],
    documents: [],
  };

  result.records.forEach((r) => {
    response.name = r.get("Company");
  });

  return response;
}
