import { Model, ModelCtor } from 'sequelize';

export interface IUser {
  id: string;
  name: string;
  cpf: string;
  party_id: string;
  signature: string;
  rating: number;
}

export type UserModel = Model<IUser>;

export type UserCtorModel = ModelCtor<Model<IUser>>;