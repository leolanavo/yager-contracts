import { AppliedPaymentModel } from 'src/typings/AppliedPayment';
import { ClauseModel } from 'src/typings/Clause';
import { IncrementModel } from 'src/typings/Increment';
import { PaymentModel } from 'src/typings/Payment';

export interface MongoDBInterface {
  AppliedPayment: AppliedPaymentModel;
  Clause: ClauseModel;
  Increment: IncrementModel;
  Payment: PaymentModel;
  [key: string]: AppliedPaymentModel | ClauseModel | IncrementModel | PaymentModel;
}