import mongoose from 'mongoose';

import AppliedPayment from '@mongodb/models/AppliedPayment';
import Increment from '@mongodb/models/Increment';
import Payment from '@mongodb/models/Payment';
import Clause from '@mongodb/models/Clause';

const mongoUrl: string = process.env.MONGO_URL
  ? process.env.MONGO_URL
  : 'mongodb://mongo:27017/yager';

mongoose.connect(mongoUrl);

export default {
  AppliedPayment,
  Increment,
  Payment,
  Clause
};
