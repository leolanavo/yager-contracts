import { IResolvers } from "apollo-server-koa";

import { createCompany } from "@resolvers/Company";
import { createPayment, getPayment } from "@resolvers/AppliedPayment";
import { createClause } from "@resolvers/Clause";
import { createUser } from "@resolvers/User";

import {
  getBestRatedCompaniesBySegment,
//   getClosestCompanyPathBySegment,
//   getRelatedCompanies,
//   getRelatedCompaniesBySegment,
//   getRelatedCompaniesBySegmentWithMoreContracts,
} from "@resolvers/Recommendation";

const resolvers: IResolvers = {
  Mutation: {
    createClause,
    createCompany,
    createPayment,
    createUser,
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
