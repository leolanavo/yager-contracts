import { model, Schema } from 'mongoose';

import { PaymentDocument, PaymentModel } from "@typings/Payment";

const Payment: PaymentModel =
  model<PaymentDocument>('Payment', new Schema({
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
  }));

export default Payment;
