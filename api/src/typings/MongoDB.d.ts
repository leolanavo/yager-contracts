import { AppliedPaymentModel } from 'src/typings/AppliedPayment';
import { ClauseModel } from 'src/typings/Clause';
import { IncrementModel } from 'src/typings/Increment';
import { PaymentModel } from 'src/typings/Payment';
import { ContractModel } from 'src/typings/Contract';
import { ExtensionModel } from 'src/typings/Extension';
import { AppliedClauseModel } from 'src/typings/AppliedClause';
import { NotificationModel } from 'src/typings/Notification';
import { Notification } from 'neo4j-driver';

export interface MongoDBInterface {
  AppliedPayment: AppliedPaymentModel;
  Clause: ClauseModel;
  Increment: IncrementModel;
  Payment: PaymentModel;
  Contract: ContractModel;
  Extension: ExtensionModel;
  AppliedClause: AppliedClauseModel;
  Notification: NotificationModel;
  [key: string]: AppliedPaymentModel | ClauseModel | IncrementModel |
  PaymentModel | ContractModel | ExtensionModel | AppliedClauseModel |
  NotificationModel;
}