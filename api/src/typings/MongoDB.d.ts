import { BillModel } from 'src/typings/Bill';
import { ClauseModel } from 'src/typings/Clause';
import { IncrementModel } from 'src/typings/Increment';
import { PaymentModel } from 'src/typings/Payment';
import { ContractModel } from 'src/typings/Contract';
import { ExtensionModel } from 'src/typings/Extension';
import { AppliedClauseModel } from 'src/typings/AppliedClause';
import { NotificationModel } from 'src/typings/Notification';

export interface MongoDBInterface {
  Bill: BillModel;
  Clause: ClauseModel;
  Increment: IncrementModel;
  Payment: PaymentModel;
  Contract: ContractModel;
  Extension: ExtensionModel;
  AppliedClause: AppliedClauseModel;
  Notification: NotificationModel;
  [key: string]: BillModel | ClauseModel | IncrementModel |
  PaymentModel | ContractModel | ExtensionModel | AppliedClauseModel |
  NotificationModel;
}