import { Sequelize, Model } from 'sequelize';

export interface PostgresInterface {
  instance: Sequelize,
}