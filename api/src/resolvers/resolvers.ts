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
import { createPayment, getPayment } from "@resolvers/Bill";
import { addNotification } from '@resolvers/AppliedClause';

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
    addExtension,
    terminateContract,
    addNotification,
    createPayment,
  },
  Query: {
    getPayment,
    getContract,
    getBestRatedCompanyBySegment,
    getClosestCompanyPathBySegment,
    getRelatedCompanies,
    getRelatedCompaniesBySegment,
    getRelatedCompanyBySegmentWithMoreContracts,
  },
};

export default resolvers;
