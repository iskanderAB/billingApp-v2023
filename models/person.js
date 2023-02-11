'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.Address);
      this.hasMany(models.Document);
      this.hasMany(models.Payments)
    }
  };
  Person.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    fullName : {
        type : DataTypes.STRING,
        allowNull : false
    },
    tel : {
        type : DataTypes.INTEGER,
        allowNull : true
    },
    email : {
        type : DataTypes.STRING
    },
    type : {
      type : DataTypes.ENUM('F','C') , //fornisseur ou  client  
      allowNull : false
    } ,
    codeTVA : DataTypes.STRING,
    Address : DataTypes.STRING,
    archived :{
      type: DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : false 
    } 
    // archived : DataTypes.BOOLEAN 
  }, {
    sequelize,
    modelName: 'Person',
  });
  return Person;
};