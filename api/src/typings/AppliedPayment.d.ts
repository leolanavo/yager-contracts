import { Document, Model } from 'mongoose';

export interface AppliedPayment {
  _id: string;
  baseValue: number;
  type: string;
  dueDate: string;
}

export interface AppliedPaymentDocument extends Document {
  _id: string;
  baseValue: number;
  type: string;
  dueDate: string;
}

export declare type AppliedPaymentModel = Model<AppliedPaymentDocument>;