import { Document, model, Model, Schema } from 'mongoose';

export interface IAppliedPayment {
  _id: string;
  email: string;
  name: string;
}

export interface IAppliedPayment extends Document {
  _id: string;
  email: string;
  name: string;
}

export declare type TAppliedPayment = Model<IAppliedPayment>;

const AppliedPayment: TAppliedPayment = model<IAppliedPayment>('AppliedPayment', new Schema({
  _id: String,
  email: String,
  name: String,
}));

export default AppliedPayment;
