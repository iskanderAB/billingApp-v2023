'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
      // this.belongsTo(models.Person);
    }
  };
  Address.init({
    id: {
      type : DataTypes.INTEGER , 
      autoIncrement : true , 
      allowNull : false,
      primaryKey : true
    },
    street : DataTypes.STRING,
    city : DataTypes.STRING,
    state : DataTypes.STRING,
    PostalCode : DataTypes.STRING,
    country : DataTypes.STRING,
    Address : {
      type : DataTypes.STRING ,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};