import { Document, Model } from 'mongoose';
import { Payment, PaymentDocument } from '@typings/Payment';

export interface ClauseInput {
  delayTolerance: number;
  numberNotifications: number;
  rescissory: boolean;
  text: string;
  payment: {
    baseCharge: number;
    kind: string;
    paymentDeadline: number;
    increments: {
      period: number;
      relativeRate: number;
      absoluteRate: number;
    }[];
  };
}

export interface Clause {
  _id: string;
  text: string;
  references: string[];
  payment: Payment;
}

export interface ClauseDocument extends Document {
  _id: string;
  text: string;
  references: string[];
  payment: PaymentDocument;
}

export declare type ClauseModel = Model<ClauseDocument>;