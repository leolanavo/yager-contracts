import mongoose from 'mongoose';

import AppliedPayment from '@mongodb/models/AppliedPayment';
import Increment from '@mongodb/models/Increment';
import Payment from '@mongodb/models/Payment';
import Clause from '@mongodb/models/Clause';
import Contract from '@mongodb/models/Contract';
import Extension from '@mongodb/models/Extension';
import AppliedClause from '@mongodb/models/AppliedClause';
import Notification from '@mongodb/models/Notification';


const mongoUrl: string = process.env.MONGO_URL
  ? process.env.MONGO_URL
  : 'mongodb://mongo:27017/yager';

mongoose.connect(mongoUrl);

export default {
  AppliedPayment,
  Increment,
  Payment,
  Clause,
  Contract,
  Extension,
  AppliedClause,
  Notification
};
