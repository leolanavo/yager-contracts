import { Context } from "@typings/Context";

const createInContractCypher = `MATCH (a), (b)
WHERE a.party_id = $main_party AND b.party_id = $secondary_party
CREATE (a)-[r:IN_CONTRACT]->(b)
RETURN type(r);`;

export async function createInContract(
  _: any,
  args: any,
  context: Context,
  ___: any
): Promise<any> {
  const { neo4j }: Context = context;
  const { main_party, secondary_party }: any = args;

  //TODO: Criar na tabela in_contract do postgres

  await neo4j.session.run(createInContractCypher, {
    main_party,
    secondary_party,
  });

  return "hello";
}
