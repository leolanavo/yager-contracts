import { Document, Model } from 'mongoose';

export interface Extension {
  _id: string;
  date: string;
  newEndDate: string;
}

export interface ExtensionDocument extends Document {
  _id: string;
  date: string;
  newEndDate: string;
}

export declare type ExtensionModel = Model<ExtensionDocument>;