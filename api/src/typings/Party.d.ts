import { Model, ModelCtor } from 'sequelize';

export interface IParty {
  id: string;
}

export interface ISealContract {
  main_party: string;
  secondary_party: string;
  contract_id: string;
}

export type PartyModel = Model<IParty>;

export type PartyCtorModel = ModelCtor<Model<IParty>>;