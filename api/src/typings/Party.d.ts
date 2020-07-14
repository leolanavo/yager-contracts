import { Model, ModelCtor } from 'sequelize';

export interface IParty {
  id: string;
}

export type PartyModel = Model<IParty>;

export type PartyCtorModel = ModelCtor<Model<IParty>>;