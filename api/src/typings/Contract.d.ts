import { Document, Model } from 'mongoose';
import { ExtensionModel } from '@typings/Extension'
import { AppliedClauseModel } from '@typings/AppliedClause';

export interface Contract {
  _id: string;
  partyA: string,
  partyB: string,
  startDate: string,
  endDate: string,
  extensions: ExtensionModel[],
  appliedClauses: AppliedClauseModel[]
  terminatedBy: String
}

export interface ContractDocument extends Document {
  _id: string;
  partyA: string,
  partyB: string,
  startDate: string,
  endDate: string,
  extensions: ExtensionModel[],
  appliedClauses: AppliedClauseModel[]
  terminatedBy: String
}

export declare type ContractModel = Model<ContractDocument>;