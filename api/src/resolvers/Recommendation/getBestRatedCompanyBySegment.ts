import { Context } from "@typings/Context";

interface Args {
  name: string;
  segment: string;
}

const cypherQuery = `MATCH 
  (u:User {name: $name}) - [:IN_CONTRACT*1..5] -> 
  (c:Company) - [:COMPANY_SEGMENT] -> (s:Segment {name: $segment})
RETURN c.name as Company, MAX(c.rating) as Rating;
`;

export async function getBestRatedCompanyBySegment(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<any> {
  const { neo4j }: Context = context;
  const { name, segment } = args;

  const result = await neo4j.session.run(cypherQuery, {
    name,
    segment,
  });

  console.log(result);

  const response = {
    id: "",
    cpnj: "",
    name: "",
    segments: [],
    documents: [],
  };

  result.records.forEach(r => {
    response.name = r.get('Company');
  });

  return response;
}
