import mongoose from 'mongoose';

import AppliedPayment, { TAppliedPayment } from 'src/db/mongo/models/AppliedPayment';

export interface DbConnection {
  [key: string]: TAppliedPayment;
}

const mongoUrl: string = process.env.MONGO_URL
  ? process.env.MONGO_URL
  : 'mongodb://mongo:27017/yager';

mongoose.connect(mongoUrl);

export default {
  AppliedPayment,
};
