import { Model, DataTypes } from 'sequelize'

import postgres from '@postgres/postgres';
import { IParty, ISealContract } from "@typings/Party";

export class Party extends Model<IParty> {
  public id!: string;
}

export class SealContract extends Model<ISealContract> {
  public main_party!: string;
  public secondary_party!: string;
  public contract_id!: string;
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

Party.hasMany(SealContract);

export default Party;
