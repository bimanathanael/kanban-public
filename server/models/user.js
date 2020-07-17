'use strict';

const { encrypt, checkPass} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
    }
  };
  User.init({
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    organization: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    hooks:{
      beforeSave : (user) => {
        user.password = encrypt(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};