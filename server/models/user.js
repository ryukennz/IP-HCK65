'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cats, {foreignKey: 'UserId'});
      User.hasMany(models.Order, {foreignKey: 'userId'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already taken'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Username cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already taken'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Password cannot be empty'
        },
        len: {
          args: 5,
          msg: 'Password must be minimum 5 characters'
        }
      }
    },
    subscription: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'free'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate( (user, options) => {
    const hashedPassword =  hashPassword(user.password);
    user.password = hashedPassword;
  });
  return User;
};