import { Document, Model } from 'mongoose';
import { Notification, NotificationDocument } from '@typings/Notification';

export interface AppliedClause {
  _id: string;
  date: string;
  delayTolerance: number;
  numberNotifications: number;
  rescissory: boolean;
  clauseID: string;
  notifications: Notification[];
}

export interface AppliedClauseDocument extends Document {
  _id: string;
  date: string;
  delayTolerance: number;
  numberNotifications: number;
  rescissory: boolean;
  clauseID: string;
  notifications: NotificationDocument[];
}

export declare type AppliedClauseModel = Model<AppliedClauseDocument>;