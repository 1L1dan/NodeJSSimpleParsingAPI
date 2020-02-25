import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config';

export class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public refreshToken!: string | null;
  public resetToken!: string | null;
}
User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  refreshToken: {
    type: new DataTypes.STRING(256),
    allowNull: true
  },
  resetToken: {
    type: new DataTypes.STRING(256),
    allowNull: true
  },
},
  {
    tableName: 'Users',
    sequelize: sequelize,
  });
