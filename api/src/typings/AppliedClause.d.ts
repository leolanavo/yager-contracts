import { Document, Model } from 'mongoose';
import { NotificationModel } from '@typings/Notification';

export interface AppliedClause {
  _id: string;
  date: string,
  delayTolerance: number,
  numberNotifications: number,
  rescissory: boolean,
  clauseID: string,
  notifications: NotificationModel[]
}

export interface AppliedClauseDocument extends Document {
  _id: string;
  date: string,
  delayTolerance: number,
  numberNotifications: number,
  rescissory: boolean,
  clauseID: string,
  notifications: NotificationModel[]
}

export declare type AppliedClauseModel = Model<AppliedClauseDocument>;