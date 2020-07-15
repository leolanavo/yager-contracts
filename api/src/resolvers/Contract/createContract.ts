import { Contract } from '@typings/Contract';
import { Context } from '@typings/Context';
import Party from "@postgres/models/Party";
import InContract from "@postgres/models/InContract";
import { ApolloError } from 'apollo-server-koa';

interface Args {
  mainParty: string;
  secondaryParty: string;
  startDate: string;
  endDate: string;
  clauses: {
    delayTolerance: number;
    numberNotifications: number;
    rescissory: boolean;
    text: string;
    payment: {
      baseCharge: number;
      kind: string;
      paymentDeadline: number;
      increments: {
        period: number;
        relativeRate: number;
        absoluteRate: number;
      }[];
    };
  }[]
}

const createInContractCypher = `MATCH (a), (b)
WHERE a.party_id = $main_party AND b.party_id = $secondary_party
CREATE (a)-[r:IN_CONTRACT]->(b)
RETURN type(r);`;

export async function createContract(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<Contract> {
  const { mongodb: mongo, neo4j, uuidv4 }: Context = context;

  const _id = uuidv4();

  const mainParty = await Party.findOne({
    id: args.mainParty,
  });
  const secondaryParty = await Party.findOne({
    id: args.secondaryParty,
  });

  if (!mainParty || !secondaryParty)
    throw new ApolloError('Could not find parties', '404');

  let clauses: any[] = args.clauses.map(clause => {
    clause.payment.increments = clause.payment.increments.map(inc => ({ _id: uuidv4(), ...inc }));
    return {
      _id: uuidv4(),
      ...clause
    }
  });

  const contract: any = {
    _id,
    mainParty: args.mainParty,
    secondaryParty: args.secondaryParty,
    startDate: args.startDate,
    endDate: args.endDate,
    appliedClauses: clauses.map(clause => ({
      _id: uuidv4(),
      date: args.startDate,
      delayTolerance: clause.delayTolerance,
      numberNotifications: clause.numberNotifications,
      rescissory: clause.rescissory,
      clauseID: clause._id
    })),
  };

  await mongo.Contract.insertMany([contract]);

  clauses = clauses.map(clause => ({
    _id: clause._id,
    text: clause.text,
    payment: { ...clause.payment }
  }));

  await mongo.Clause.insertMany(clauses);

  const inContract = new InContract();
  inContract.contractId = _id;
  inContract.mainParty = mainParty;
  inContract.secondaryParty = secondaryParty;
  await InContract.save(inContract);

  // TODO: add inContract in postgers

  await neo4j.session.run(createInContractCypher, {
    main_party: args.mainParty,
    secondary_party: args.secondaryParty
  });

  return contract;
}