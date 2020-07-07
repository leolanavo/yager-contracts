import { Sequelize } from 'sequelize';
import { Company } from '@typings/Company';

export interface PostgresInterface {
  instance: Sequelize,
  Company: Company,
}