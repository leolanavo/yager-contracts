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

  const result = await neo4j.driver
    .session({
      defaultAccessMode: "WRITE",
      database: "yager",
    })
    .run(cypherQuery, {
      name,
      segment,
    });

  const response = [] as any;

  console.log(response);

  result.records.forEach((r) => {
    const company = {
      id: "",
      cpnj: "",
      name: "",
      segments: [],
      documents: [],
    };

    company.name = r.get("Company");

    console.log(company);

    response.push(company);
  });

  return response;
}
