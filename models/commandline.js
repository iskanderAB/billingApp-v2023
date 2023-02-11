'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommandLine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Document);
      this.belongsTo(models.Product)
    }
  };
  CommandLine.init({
      id : {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      discount : {
        type : DataTypes.DOUBLE,  
        defaultValue : 0     
      },
      designation :{
        type : DataTypes.STRING,
        allowNull : false
      },
      internal_reference : {
        type : DataTypes.STRING,
        allowNull : false
      },
      description : {
        type : DataTypes.STRING,
        allowNull : true
      },
      tva : { 
        type : DataTypes.DOUBLE,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      quantity : {
        type :DataTypes.INTEGER,
        allowNull : false , 
      }
  }, {
    sequelize,
    modelName: 'CommandLine',
  });
  return CommandLine;
};