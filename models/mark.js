'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product)
    }
  };
  Mark.init({
    id : {
      type : DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  name :  {
      type : DataTypes.STRING,
      allowNull : false
  } 
  }, {
    sequelize,
    modelName: 'Mark',
  });
  return Mark;
};