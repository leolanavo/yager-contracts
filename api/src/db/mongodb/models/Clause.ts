import { model, Schema } from 'mongoose';

import { ClauseModel, ClauseDocument } from '@typings/Clause';

const Clause: ClauseModel =
  model<ClauseDocument>('Clause', new Schema({
    _id: String,
    text: String,
    payment: Object
  }));

export default Clause;

