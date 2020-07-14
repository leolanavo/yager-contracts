import { Model, ModelCtor } from 'sequelize';

export interface ICompany {
  id: string;
  name: string;
  cnpj: string;
}

export type CompanyModel = Model<ICompany>;

export type CompanyCtorModel = ModelCtor<Model<ICompany>>;