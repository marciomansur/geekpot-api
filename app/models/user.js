import bcrypt from 'bcryptjs';

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

      verifyPassword: (password) => {
        if (!password) {
          return false;
        }

        var salt = bcrypt.genSaltSync(10);
        return bcrypt.compareSync(password, this.password, salt);
      }
    }
  });
  return User;
}
