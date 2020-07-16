import { IResolvers } from "apollo-server-koa";

import { createUser, addRepresentation } from "@resolvers/User";
import { createCompany } from "@resolvers/Company";

import { createContract, addExtension, addClause } from "@resolvers/Contract";
import { createPayment, getPayment } from "@resolvers/AppliedPayment";

import {
  getBestRatedCompaniesBySegment,
  //   getClosestCompanyPathBySegment,
  //   getRelatedCompanies,
  //   getRelatedCompaniesBySegment,
  //   getRelatedCompaniesBySegmentWithMoreContracts,
} from "@resolvers/Recommendation";

const resolvers: IResolvers = {
  Mutation: {
    createUser,
    addRepresentation,
    createCompany,
    createContract,
    addClause,
    createPayment,
    addExtension,
  },
  Query: {
    getPayment,
    getBestRatedCompaniesBySegment,
    // getClosestCompanyPathBySegment,
    // getRelatedCompanies,
    // getRelatedCompaniesBySegment,
    // getRelatedCompaniesBySegmentWithMoreContracts,
  },
};

export default resolvers;
