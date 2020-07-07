import { Model } from 'sequelize';

export interface ICompany {
  id: string;
  name: string;
  cnpj: string;
}

export class Company extends Model<ICompany> {
  public id: string;
  public name: string;
  public cnpj: string;

  public toGraphQL(): ICompany;
}