import { model, Schema } from 'mongoose';

import { ContractModel, ContractDocument } from '@typings/Contract';

const Contract: ContractModel =
  model<ContractDocument>('Contract', new Schema({
    _id: String,
    partyA: String,
    partyB: String,
    startDate: String,
    endDate: String,
    extensions: [{
      _id: String,
      date: String,
      newEndDate: String,
    }],
    appliedClauses: [{
      _id: String,
      date: String,
      delayTolerance: Number,
      numberNotifications: Number,
      rescissory: Boolean,
      clauseID: String
    }]

  }));

export default Contract;

