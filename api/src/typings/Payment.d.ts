import { Document, Model } from 'mongoose';

import { Increment, IncrementDocument } from '@typings/Increment'

export interface Payment {
  _id: string;
  baseCharge: number,
  kind: string,
  paymentDeadline: number,
  increments: Increment[],
}

export interface PaymentDocument extends Document {
  _id: string;
  baseCharge: number;
  kind: string;
  paymentDeadline: number;
  increments: IncrementDocument[];
}

export declare type PaymentModel = Model<PaymentDocument>;