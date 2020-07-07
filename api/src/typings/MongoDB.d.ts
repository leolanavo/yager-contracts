import { AppliedPaymentModel } from 'src/typings/AppliedPayment';

export interface MongoDBInterface {
  AppliedPayment: AppliedPaymentModel;
  [key: string]: AppliedPaymentModel;
}