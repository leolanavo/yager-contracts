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

  const result = await neo4j.driver
    .session({
      defaultAccessMode: "WRITE",
      database: "yager",
    })
    .run(cypherQuery, {
      name,
      segment,
    });

  console.log("\n\n\ngetClosestCompanyPathBySegment");
  console.log(result.records);

  const response = [] as any;

  result.records.forEach((r) => {
    const path = r.get("Path");

    path.segments.forEach((segment) => {
      const node = segment.start;

      response.push(node.properties.name);
    });
  });

  return response;
}
