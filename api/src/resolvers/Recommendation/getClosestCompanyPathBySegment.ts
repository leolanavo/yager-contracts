import { Context } from "@typings/Context";

interface Args {
  name: string;
  segment: string;
}

const cypherQuery = `
  MATCH 
    p = ((u:User {name: $name}) - [:IN_CONTRACT*2..5] -> 
    (c:Company) - [:COMPANY_SEGMENT] -> (s:Segment {name: $segment}))
  RETURN p as Path;
`;

export async function getClosestCompanyPathBySegment(
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
