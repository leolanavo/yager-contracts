
import { Model, DataTypes } from 'sequelize'

import Company from '@postgres/models/Company';
import Party from '@postgres/models/Party';
import postgres from '@postgres/postgres';
import { IUser } from '@typings/User';

class User extends Model<IUser> {
  public id!: string;
  public name!: string;
  public cpf!: string;
  public party_id!: string;
}

User.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  rg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  signature: {
    type: DataTypes.STRING,
  },
}, {
  sequelize: postgres,
  timestamps: false
});

User.hasOne(Party);
User.hasMany(Company);

export default User;
