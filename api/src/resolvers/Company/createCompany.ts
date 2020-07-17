import { ApolloError } from "apollo-server-koa";

import { Context } from "@typings/Context";
import Company from "@postgres/models/Company";
import Party from "@postgres/models/Party";

interface Args {
  name: string;
  cnpj: string;
  segments: string[];
}

const createCompanyCypher = `CREATE (:Company {
  id: $id, 
  name: $name, 
  party_id: $party_id, 
  cnpj: $cnpj, 
  rating: $rating
})`;

const createSegmentCypher = `CREATE(:Segment {
  name: $name
});`;

const createCompanySegmentCypher = `MATCH (a:Company), (b:Segment)
WHERE a.id = $id AND b.name = $segment
CREATE (a)-[r:COMPANY_SEGMENT]->(b)
RETURN type(r);`;

export async function createCompany(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<any> {
  const { neo4j, uuidv4 }: Context = context;
  const { name, cnpj, segments }: Args = args;

  const companyCheck = await Company.findOne({
    cnpj: args.cnpj,
  });

  if (companyCheck) throw new ApolloError(`CNPJ ${cnpj} already in use`, "409");

  const party = new Party();
  party.id = uuidv4();
  party.entity = "company";
  await party.save();

  const company = new Company();
  company.id = uuidv4();
  company.party = party;
  Object.keys(args).forEach((k) => (company[k] = args[k]));
  await Company.save(company);

  await neo4j.driver
    .session({
      defaultAccessMode: "WRITE",
      database: "yager",
    })
    .run(createCompanyCypher, {
      id: company.id,
      name,
      cnpj,
      party_id: party.id,
      rating: 0,
    });

  segments.forEach(async (segment) => {
    await neo4j.driver
      .session({
        defaultAccessMode: "WRITE",
        database: "yager",
      })
      .run(createSegmentCypher, {
        name: segment,
      });

    await neo4j.driver
      .session({
        defaultAccessMode: "WRITE",
        database: "yager",
      })
      .run(createCompanySegmentCypher, {
        id: company.id,
        segment,
      });
  });

  return company.toJSON();
}
