import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    admin: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    active: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deleted_at: DataTypes.DATE
  }, {
    tableName: 'users',
    classMethods: {
      associate: (models) => {

      },

      hashPassword: (password) => {
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
      },

      verifyPassword: (password, oldPass) => {
        if (!password) {
          return false;
        }

        var salt = bcrypt.genSaltSync(10);
        return bcrypt.compareSync(password, oldPass, salt);
      },

      genToken: (id) => {
        var token = jwt.sign({
          id: id,
        }, config.key.privateKey);

        return token;
      }
    }
  });
  return User;
}
