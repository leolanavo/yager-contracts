import { model, Schema } from 'mongoose';

import { PaymentDocument, PaymentModel } from "@typings/Payment";

const Payment: PaymentModel =
  model<PaymentDocument>('Payment', new Schema({
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
  }));

export default Payment;
