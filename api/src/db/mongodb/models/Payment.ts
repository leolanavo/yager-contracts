import { model, Schema } from 'mongoose';

import { PaymentDocument, PaymentModel } from "@typings/Payment";

const Payment: PaymentModel =
  model<PaymentDocument>('Payment', new Schema({
    _id: String,
    baseCharge: Number,
    type: String,
    payment_deadline: Number,
    increments: [Object],
  }));

export default Payment;
