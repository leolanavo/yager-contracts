import { model, Schema } from 'mongoose';

import { IncrementDocument, IncrementModel } from "@typings/Increment";

const Increment: IncrementModel =
  model<IncrementDocument>('Increment', new Schema({
    _id: String,
    period: Number,
    relative_rate: Number,
    absolute_rate: Number,
  }));

export default Increment;
