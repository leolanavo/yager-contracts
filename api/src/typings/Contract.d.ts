import { Document, Model } from 'mongoose';
import { ExtensionDocument, Extension } from '@typings/Extension'
import { AppliedClauseDocument, AppliedClause } from '@typings/AppliedClause';

export interface Contract {
  _id: string;
  mainParty: string;
  secondaryParty: string;
  startDate: string;
  endDate: string;
  extensions: Extension[];
  appliedClauses: AppliedClause[];
  terminatedBy: string;
  terminatedDate: string;
}

export interface ContractDocument extends Document {
  _id: string;
  mainParty: string;
  secondaryParty: string;
  startDate: string;
  endDate: string;
  extensions: ExtensionDocument[];
  appliedClauses: AppliedClauseDocument[];
  terminatedBy: string;
  terminatedDate: string;
}

export declare type ContractModel = Model<ContractDocument>;