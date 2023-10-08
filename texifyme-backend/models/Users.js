// E:\programming\Project\TexifyMe\texifyme-backend\models\Users.js

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.ConversionHistory, {
        foreignKey: 'userId',
        as: 'histories'
      });
      User.belongsTo(models.MemberTypes, {
        foreignKey: 'member_type_id',
        as: 'MemberTypes'
      });
    }
  }
  User.init({
    userId: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'free_member',
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    member_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'MemberTypes',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
