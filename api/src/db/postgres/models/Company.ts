import { Model, DataTypes } from 'sequelize'

import { ICompany } from "@typings/Company";

import postgres from '@postgres/postgres';

class Company extends Model<ICompany> {
  public id!: string;
  public name!: string;
  public cnpj!: string;
}

Company.init({
  id: DataTypes.STRING,
  name: DataTypes.STRING,
  cnpj: DataTypes.STRING
}, {
  sequelize: postgres.instance,
  timestamps: false
});

export default Company;
