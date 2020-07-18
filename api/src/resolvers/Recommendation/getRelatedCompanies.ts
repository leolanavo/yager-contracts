import { Context } from "@typings/Context";

interface Args {
  name: string;
}

const cypherQuery = `
  MATCH 
    (u:User {name: $name}) - [:IN_CONTRACT*1..5] -> (c:Company), 
    (c) - [:COMPANY_SEGMENT] -> (s:Segment) 
  RETURN c.name as Company, collect(s.name) as Segments;
`;

export async function getRelatedCompanies(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<any> {
  const { neo4j }: Context = context;
  const { name } = args;

  const result = await neo4j.driver
    .session({
      defaultAccessMode: "WRITE",
      database: "yager",
    })
    .run(cypherQuery, {
      name,
    });

  const response = [] as any;

  result.records.forEach((r) => {
    const company = {
      id: "",
      cpnj: "",
      name: "",
      segments: [],
      documents: [],
    };

    company.name = r.get("Company");
    company.segments = r.get("Segments");

    response.push(company);
  });

  return response;
}
