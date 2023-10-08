// E:\programming\Project\TexifyMe\texifyme-backend\models\MemberTypes.js

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const MemberTypes = sequelize.define('MemberTypes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255)
    },
    monthly_fee: {
      type: DataTypes.INTEGER
    },
    max_uploads: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false // この行を追加
  });
  MemberTypes.init({
    name: DataTypes.STRING,
    monthly_fee: DataTypes.INTEGER,
    max_uploads: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MemberTypes',
  });

  return MemberTypes;
};
