import { Document, Model } from 'mongoose';
import { ExtensionModel } from '@typings/Extension'
import { AppliedClauseModel } from '@typings/AppliedClause';

export interface Contract {
  _id: string;
  mainParty: string;
  secondaryParty: string;
  startDate: string;
  endDate: string;
  extensions: ExtensionModel[];
  appliedClauses: AppliedClauseModel[];
  terminatedBy: string;
  terminatedDate: string;
}

export interface ContractDocument extends Document {
  _id: string;
  mainParty: string;
  secondaryParty: string;
  startDate: string;
  endDate: string;
  extensions: ExtensionModel[];
  appliedClauses: AppliedClauseModel[];
  terminatedBy: string;
  terminatedDate: string;
}

export declare type ContractModel = Model<ContractDocument>;