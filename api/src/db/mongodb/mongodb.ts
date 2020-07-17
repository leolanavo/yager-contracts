import mongoose from 'mongoose';

import Bill from '@mongodb/models/Bill';
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
  Bill,
  Increment,
  Payment,
  Clause,
  Contract,
  Extension,
  AppliedClause,
  Notification
};
