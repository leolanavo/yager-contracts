import { IResolvers } from "apollo-server-koa";

import { createUser, addRepresentation } from "@resolvers/User";
import { createCompany } from "@resolvers/Company";

import { createContract } from "@resolvers/Contract";
import { createPayment, getPayment } from "@resolvers/AppliedPayment";
// import { createClause } from "@resolvers/Clause";

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
    createPayment,
    // createClause,
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
