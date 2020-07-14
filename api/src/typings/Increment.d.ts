import { Document, Model } from 'mongoose';

export interface Increment {
  _id: string;
  period: number,
  relativeRate: number,
  absoluteRate: number,
}

export interface IncrementDocument extends Document {
  _id: string;
  period: number,
  relativeRate: number,
  absoluteRate: number,
}

export declare type IncrementModel = Model<IncrementDocument>;