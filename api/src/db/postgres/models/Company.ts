import { Model, DataTypes } from 'sequelize'

import User from '@postgres/models/User';
import Party from '@postgres/models/Party';
import postgres from '@postgres/postgres';
import { ICompany } from "@typings/Company";

class Company extends Model<ICompany> {
  public id!: string;
  public name!: string;
  public cnpj!: string;
  public segments!: string[];
  public documents!: string[];
}

Company.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cnpj: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  segments: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    allowNull: false,
  },
  documents: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    allowNull: false,
  }
}, {
  sequelize: postgres,
  timestamps: false
});

Company.hasOne(Party);
Company.hasMany(User, { as: 'representatives' });

export default Company;
