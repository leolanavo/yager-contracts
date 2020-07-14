import { Model, DataTypes } from 'sequelize'

import postgres from '@postgres/postgres';
import { IParty } from "@typings/Party";

export class Party extends Model<IParty> {
  public id!: string;
}

Party.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
}, {
  sequelize: postgres,
  timestamps: false
});
