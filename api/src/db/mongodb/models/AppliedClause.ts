import { model, Schema } from 'mongoose';

import { AppliedClauseModel, AppliedClauseDocument } from '@typings/AppliedClause';

const AppliedClause: AppliedClauseModel =
  model<AppliedClauseDocument>('AppliedClause', new Schema({
    _id: String,
    date: String,
    delayTolerance: Number,
    numberNotifications: Number,
    rescissory: Boolean,
    clauseID: String,
    notifications: [{
      _id: String,
      date: String,
    }]
  }));

export default AppliedClause;

