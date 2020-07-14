import * as pg from 'pg';
import { Sequelize } from 'sequelize'

const instance = new Sequelize(
  process.env.POSTGRES_URL as string,
  {
    dialectModule: pg
  }
);

export default {
  instance,
};