import { Document, Model } from 'mongoose';
import { PaymentModel } from '@typings/Payment';

export interface Clause {
  _id: string;
  text: string,
  payment: PaymentModel
  references: string[]
}

export interface ClauseDocument extends Document {
  _id: string;
  text: string,
  payment: PaymentModel
  references: string[]
}

export declare type ClauseModel = Model<ClauseDocument>;