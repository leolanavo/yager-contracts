import { Document, Model } from 'mongoose';

export interface AppliedPayment {
  _id: string;
  extraCharge: number,
  chargeDate: string,
  paymentDate: string
}

export interface AppliedPaymentDocument extends Document {
  _id: string;
  extraCharge: number,
  chargeDate: string,
  paymentDate: string
}

export declare type AppliedPaymentModel = Model<AppliedPaymentDocument>;