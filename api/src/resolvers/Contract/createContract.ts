import { Contract } from '@typings/Contract';
import { Context } from '@typings/Context';

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
      type: string;
      paymentDeadline: number;
      increments: {
        period: number;
        relativeRate: number;
        absoluteRate: number;
      }[];
    };
  }[]
}

export async function createContract(
  _: any,
  args: Args,
  context: Context,
  ___: any
): Promise<Contract> {
  const { mongodb: mongo, uuidv4 }: Context = context;

  const _id = uuidv4();

  const clauses: any[] = args.clauses.map(clause => {
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

  console.log("First");
  await mongo.Contract.insertMany([contract]);

  const clauses2 = clauses.map(clause => ({
    _id: clause._id,
    text: clause.text,
    payment: { ...clause.payment }
  }));

  console.log("clauses");
  console.log(clauses2);
  console.log("clauses");

   mongo.Clause.insertMany(clauses2);
  console.log("second");

  return contract;
}