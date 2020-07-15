import { Contract } from '@typings/Contract';
import { Context } from '@typings/Context';
import Party from "@postgres/models/Party";

interface Args {
  partyA: string;
  partyB: string;
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

  let clauses: any[] = args.clauses.map(clause => {
    clause.payment.increments = clause.payment.increments.map(inc => ({ _id: uuidv4(), ...inc }));
    return {
      _id: uuidv4(),
      ...clause
    }
  });

  const contract: any = {
    _id,
    partyA: args.partyA,
    partyB: args.partyB,
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

  clauses = clauses.map(clause => ({
    _id: clause._id,
    text: clause.text,
    payment: { ...clause.payment }
  }));

  mongo.Clause.insertMany(clauses);

  const partyA = await Party.findOne({
    id: args.partyA,
  });
  const partyB = await Party.findOne({
    id: args.partyB,
  });

  // TODO: add inContract in postgers

  await neo4j.session.run(createInContractCypher, {
    main_party: args.partyA,
    secondary_party: args.partyB
  });

  return contract;
}