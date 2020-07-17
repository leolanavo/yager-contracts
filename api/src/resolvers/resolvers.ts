import { IResolvers } from "apollo-server-koa";

import { createUser, addRepresentation } from "@resolvers/User";
import { createCompany } from "@resolvers/Company";

import {
  createContract,
  addExtension,
  addClause,
  terminateContract,
  getContract
} from "@resolvers/Contract";
import { createBill } from "@resolvers/Bill";
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
    createCompany,
    createContract,
    addClause,
    addReference,
    addExtension,
    terminateContract,
    addNotification,
    createBill,
  },
  Query: {
    getContract,
    getBestRatedCompanyBySegment,
    getClosestCompanyPathBySegment,
    getRelatedCompanies,
    getRelatedCompaniesBySegment,
    getRelatedCompanyBySegmentWithMoreContracts,
  },
};

export default resolvers;
