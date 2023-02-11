"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.CommandLine);
      this.belongsTo(models.Person);
    }
  }
  Document.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      reference: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      archived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      driver : DataTypes.STRING , 
      registrationNumber : DataTypes.STRING , 
      type: DataTypes.ENUM(
        "Facture",
        "Devis",
        "Avoir",
        "deliveryNote",
        "releaseVoucher",
        "providerCommand",
        "receipt",
        "invoice"
      ),
      status: DataTypes.BOOLEAN /* payer , notPayer  */,
      date: DataTypes.DATE,
      TTC: DataTypes.DOUBLE,
      PHT: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Document",
    }
  );
  return Document;
};
