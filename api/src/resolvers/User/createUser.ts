import { ApolloError } from "apollo-server-koa";
import { Context } from "@typings/Context";

import User from "@postgres/models/User";
import Party from "@postgres/models/Party";

interface Args {
  cpf: string;
  email: string;
  name: string;
  rg: string;
}

const createUserCypher = `CREATE (:User {
  id: $id, 
  name: $name, 
  party_id: $party_id, 
  cpf: $cpf, 
  rating: $rating
});`;

export async function createUser(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<any> {
  const { neo4j, uuidv4 }: Context = context;
  const { cpf, email, name } = args;

  const userCheck = await User.findOne({
    where: [{ cpf }, { email }]
  });

  if (userCheck)
    throw new ApolloError(
      `User with CPF ${cpf} and email ${email} could not be created`,
      "409"
    );

  const party = new Party();
  party.id = uuidv4();
  await party.save();

  const user = new User();
  user.id = uuidv4();
  user.party = party;
  Object.keys(args).forEach(k => user[k] = args[k]);
  await User.save(user);

  await neo4j.session.run(createUserCypher, {
    id: user.id,
    name,
    cpf,
    party_id: party.id,
    rating: 0,
  });

  return user.toJSON();
}
