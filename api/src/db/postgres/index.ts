import { Sequelize, Model, DataTypes } from 'sequelize'
import * as pg from 'pg';

const sequelize = new Sequelize(process.env.POSTGRES_URL as string, { dialectModule: pg});

class Company extends Model {}
Company.init({
  name: DataTypes.STRING,
  cnpj: DataTypes.STRING
}, { sequelize, modelName: 'companies', timestamps: false });

export default {sequelize, Company};