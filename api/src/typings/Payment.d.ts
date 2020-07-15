import { Document, Model } from 'mongoose';

import { IncrementModel } from '@typings/Increment'

export interface Payment {
  _id: string;
  baseCharge: number,
  type: string,
  paymentDeadline: number,
  increments: IncrementModel[],
}

export interface PaymentDocument extends Document {
  _id: string;
  baseCharge: number,
  type: string,
  paymentDeadline: number,
  increments: IncrementModel[],
}

export declare type PaymentModel = Model<PaymentDocument>;