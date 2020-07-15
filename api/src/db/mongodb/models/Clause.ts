import { model, Schema } from 'mongoose';

import { ClauseModel, ClauseDocument } from '@typings/Clause';

const Clause: ClauseModel =
  model<ClauseDocument>('Clause', new Schema({
    _id: String,
    text: String,
    payment: {
      _id: String,
      baseCharge: Number,
      kind: String,
      paymentDeadline: Number,
      increments: [{
        _id: String,
        period: Number,
        relativeRate: Number,
        absoluteRate: Number,
      }]
    },
    references: [String]
  }));

export default Clause;

