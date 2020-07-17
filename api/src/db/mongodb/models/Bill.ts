import { model, Schema } from 'mongoose';

import { BillDocument, BillModel } from "@typings/Bill";

const Bill: BillModel =
  model<BillDocument>('Bill', new Schema({
    _id: String,
    value: Number,
    chargeDate: String,
    paymentDate: String,
    appliedClauseID: String,
  }));

export default Bill;
