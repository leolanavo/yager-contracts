import { model, Schema } from 'mongoose';

import { ClauseModel, ClauseDocument } from '@typings/Clause';

const Clause: ClauseModel =
  model<ClauseDocument>('Clause', new Schema({
    _id: String,
    text: String,
    payment: {
      _id: String,
      baseCharge: Number,
      type: String,
      payment_deadline: Number,
      increments: [{
        _id: String,
        period: Number,
        relative_rate: Number,
        absolute_rate: Number,
      }]
    },
    references: [String]
  }));

export default Clause;

