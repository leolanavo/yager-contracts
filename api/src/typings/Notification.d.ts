import { Document, Model } from 'mongoose';

export interface Notification {
  _id: string;
  date: string,
}

export interface NotificationDocument extends Document {
  _id: string;
  date: string,
}

export declare type NotificationModel = Model<NotificationDocument>;