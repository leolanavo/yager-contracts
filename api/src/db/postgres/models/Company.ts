import { Model, DataTypes } from 'sequelize'

import { ICompany } from "@typings/Company";

import postgres from '@postgres/postgres';

class Company extends Model<ICompany> implements ICompany {
  public id!: string;
  public name!: string;
  public cnpj!: string;

  public toGraphQL(): ICompany {
    return {
      id: this.id,
      name: this.name,
      cnpj: this.cnpj,
    };
  }
}

Company.init({
  id: DataTypes.STRING,
  name: DataTypes.STRING,
  cnpj: DataTypes.STRING
}, {
  sequelize: postgres.instance,
  modelName: 'companies',
  timestamps: false
});

export default Company;
