// E:\programming\Project\TexifyMe\texifyme-backend\models\ConversionHistory.js

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConversionHistory extends Model {
    static associate(models) {
      // define association here
    }
  }
  ConversionHistory.init({
    userId: DataTypes.INTEGER,
    latexText: DataTypes.TEXT,
    imagePath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ConversionHistory',
  });
  ConversionHistory.associate = function(models) {
    ConversionHistory.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return ConversionHistory;
};
