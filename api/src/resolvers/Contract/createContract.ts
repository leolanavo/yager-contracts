import { ApolloError } from 'apollo-server-koa';
import { Context } from '@typings/Context';

import InContract from "@postgres/models/InContract";
import Party from "@postgres/models/Party";
import { Contract } from '@typings/Contract';
import { ClauseInput } from '@typings/Clause';

import { inputToClause, clauseToAppliedClause } from '@utils/clausesTransforms'
import uuid from 'uuid';

interface Args {
  mainParty: string;
  secondaryParty: string;
  startDate: string;
  endDate: string;
  clauses: ClauseInput[];
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
  const { mongodb: mongo, neo4j, uuidv4 } = context;

  const _id = uuidv4();

  const mainParty = await Party.findOne({
    id: args.mainParty,
  });
  const secondaryParty = await Party.findOne({
    id: args.secondaryParty,
  });

  if (!mainParty || !secondaryParty)
    throw new ApolloError('Could not find parties', '404');

  let clauses: any[] = args.clauses.map(clause => inputToClause(clause, uuidv4));

  const contract: any = {
    _id,
    mainParty: args.mainParty,
    secondaryParty: args.secondaryParty,
    startDate: args.startDate,
    endDate: args.endDate,
    appliedClauses: clauses.map(c => clauseToAppliedClause(c, uuid, args.startDate)),
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

  if (!mainParty.contractsAsMain)
    mainParty.contractsAsMain = []

  if (!secondaryParty.contractsAsSecondary)
    secondaryParty.contractsAsSecondary = []

  mainParty.contractsAsMain.push(inContract);
  await Party.save(mainParty);
  secondaryParty.contractsAsSecondary.push(inContract);
  await Party.save(secondaryParty);

  await neo4j.session.run(createInContractCypher, {
    main_party: args.mainParty,
    secondary_party: args.secondaryParty
  });

  return contract;
}