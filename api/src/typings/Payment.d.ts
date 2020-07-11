import { Document, Model } from 'mongoose';

import { IncrementModel } from '@typings/Increment'

export interface Payment {
  _id: string;
  baseCharge: Number,
  type: String,
  payment_deadline: Number,
  increments: IncrementModel[],
}

export interface PaymentDocument extends Document {
  _id: string;
  baseCharge: Number,
  type: String,
  payment_deadline: Number,
  increments: IncrementModel[],
}

export declare type PaymentModel = Model<PaymentDocument>;