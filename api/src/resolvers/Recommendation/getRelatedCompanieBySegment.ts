import { Context } from "@typings/Context";

interface Args {
  name: string;
  segment: string;
}

const cypherQuery = `
  MATCH 
    (u:User {name: $name}) - [:IN_CONTRACT*1..5] -> 
    (c:Company) - [:COMPANY_SEGMENT] -> (s:Segment {name: $segment})
  RETURN c.name as Company;
`;

export async function getRelatedCompaniesBySegment(
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
