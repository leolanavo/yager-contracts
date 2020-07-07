import * as pg from 'pg';
import { Sequelize } from 'sequelize'

import Company from "@postgres/models/Company"

const instance = new Sequelize(
  process.env.POSTGRES_URL as string,
  {
    dialectModule: pg
  }
);

export default {
  instance,
  Company,
};