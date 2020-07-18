import { IResolvers } from "apollo-server-koa";

import { createUser, addRepresentation, addSignature, getUser } from "@resolvers/User";
import { createCompany, getCompany } from "@resolvers/Company";

import {
  createContract,
  addExtension,
  addClause,
  terminateContract,
  getContract
} from "@resolvers/Contract";
import { createBill, payBill, getUnpaidBills } from "@resolvers/Bill";
import { addNotification } from '@resolvers/AppliedClause';
import { addReference } from "@resolvers/Clause";

import {
  getBestRatedCompanyBySegment,
  getClosestCompanyPathBySegment,
  getRelatedCompanies,
  getRelatedCompaniesBySegment,
  getRelatedCompanyBySegmentWithMoreContracts,
} from "@resolvers/Recommendation";

const resolvers: IResolvers = {
  Mutation: {
    createUser,
    addRepresentation,
    addSignature,
    createCompany,
    createContract,
    addClause,
    addReference,
    addExtension,
    terminateContract,
    addNotification,
    createBill,
    payBill,
  },
  Query: {
    getUser,
    getCompany,
    getContract,
    getBestRatedCompanyBySegment,
    getClosestCompanyPathBySegment,
    getRelatedCompanies,
    getUnpaidBills,
    getRelatedCompaniesBySegment,
    getRelatedCompanyBySegmentWithMoreContracts,
  },
};

export default resolvers;
