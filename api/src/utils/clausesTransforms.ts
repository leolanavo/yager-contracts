import { v4 } from 'uuid/interfaces';

import { ClauseInput } from '@typings/Clause';

export function inputToClause(clause: ClauseInput, uuidv4: v4): Object {
  clause.payment.increments =
    clause.payment.increments?.map(inc => ({ _id: uuidv4(), ...inc }));
  return {
    _id: uuidv4(),
    ...clause
  }
}

export function clauseToAppliedClause(
  clause: any,
  uuidv4,
  date: string,
): any {
  return {
    _id: uuidv4(),
    delayTolerance: clause.delayTolerance,
    numberNotifications: clause.numberNotifications,
    rescissory: clause.rescissory,
    clauseID: clause._id,
    date,
  }
}