import { ApolloError } from "apollo-server-koa";

import { Context } from "@typings/Context";
import { CompanyModel, CompanyCtorModel } from "@typings/Company";

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
  const { postgres, neo4j, uuidv4 }: Context = context;
  const { name, cnpj, segments }: Args = args;
  const Company: CompanyCtorModel = postgres.models.Company;

  let company: CompanyModel | null = await Company.findOne({
    where: {
      cnpj,
    },
  });

  if (company) throw new ApolloError(`CNPJ ${cnpj} already in use`, "409");

  //TODO: Criar na tabela parties do postgres
  const party_id = 2;

  company = await Company.create({
    id: uuidv4(),
    name,
    cnpj,
    party_id,
  });

  if (!company)
    throw new ApolloError(
      `Company with CNPJ ${cnpj} could not be created`,
      "409"
    );

  console.log(company);

  //TODO: Criar nó de company no neo4j
  await neo4j.session.run(createCompanyCypher, {
    id: company.get('id'),
    name,
    cnpj,
    party_id,
    rating: 0,
  });

  for (let i = 0; i < segments.length; i++) {
    //TODO: Criar segmentos na tabela company_segments
    //no postgres se não existir

    //TODO: Criar nó de segmentos se precisar e associa ao company

    await neo4j.session.run(createSegmentCypher, {
      segment: segments[i],
    });

    await neo4j.session.run(createCompanySegmentCypher, {
      id: company.get('id'),
      segment: segments[i]
    });
  }

  return company.toJSON();
}
