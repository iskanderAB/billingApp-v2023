'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.CommandLine)
      this.belongsTo(models.Mark);
      this.belongsTo(models.Category)
    }
  };
  Product.init({
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  designation : {
      type : DataTypes.STRING,
      allowNull : false
  },
  type : {
      type : DataTypes.ENUM('P','S'),
      allowNull : false
  },
  manifacturer_refernce : {
      type : DataTypes.STRING,
      allowNull : true
  } ,
  internal_refernce : {
      type : DataTypes.STRING,
      allowNull : false
  } ,
  description : {
      type : DataTypes.STRING(500),
      allowNull : true
  } ,
  image : {
      type : DataTypes.STRING,
      allowNull : true
  } ,
  price: {
      type: DataTypes.DOUBLE,
      allowNull: false
  },
  buyingPrice: {
    type: DataTypes.DOUBLE,
},
  tva: {
      type: DataTypes.FLOAT,
      allowNull: true
  },
  stock: {
      type: DataTypes.INTEGER,
      allowNull: true
  }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};