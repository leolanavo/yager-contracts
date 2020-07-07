import mongoose from 'mongoose';

import AppliedPayment from '@mongodb/models/AppliedPayment';

const mongoUrl: string = process.env.MONGO_URL
  ? process.env.MONGO_URL
  : 'mongodb://mongo:27017/yager';

mongoose.connect(mongoUrl);

export default {
  AppliedPayment,
};
