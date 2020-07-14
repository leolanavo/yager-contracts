import { Context } from "@typings/Context";

const createUserCypher = `CREATE (:User {
  id: $id, 
  name: $name, 
  party_id: $party_id, 
  cpf: $cpf, 
  rating: $rating
});`;

export async function createUser(
  _: any,
  args: any,
  context: Context,
  ___: any
): Promise<any> {
  const { neo4j }: Context = context;
  const { name, cpf }: any = args;
  
  //TODO: Criar na tabela parties do postgres
  const party_id = 1;

  //TODO: Criar um usuário no postgres
  const id = 1;

  await neo4j.session.run(createUserCypher, {
    id,
    name,
    cpf,
    party_id,
    rating: 0,
  });

  return "hello";
}
