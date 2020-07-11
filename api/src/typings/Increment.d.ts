import { Document, Model } from 'mongoose';

export interface Increment {
  _id: string;
  period: number,
  relative_rate: number,
  absolute_rate: number,
}

export interface IncrementDocument extends Document {
  _id: string;
  period: number,
  relative_rate: number,
  absolute_rate: number,
}

export declare type IncrementModel = Model<IncrementDocument>;