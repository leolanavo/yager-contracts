import { Document, Model } from 'mongoose';

export interface Bill {
  _id: string;
  value: number;
  chargeDate: string;
  paymentDate: string;
  appliedClauseID: string;
}

export interface BillDocument extends Document {
  _id: string;
  value: number;
  chargeDate: string;
  paymentDate: string;
  appliedClauseID: string;
}

export declare type BillModel = Model<BillDocument>;