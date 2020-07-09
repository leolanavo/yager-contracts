import { model, Schema } from 'mongoose';

import { AppliedPaymentDocument, AppliedPaymentModel } from "@typings/AppliedPayment";

const AppliedPayment: AppliedPaymentModel =
  model<AppliedPaymentDocument>('AppliedPayment', new Schema({
    _id: String,
    extraCharge: Number,
    chargeDate: String,
    paymentDate: String
  }));

export default AppliedPayment;
