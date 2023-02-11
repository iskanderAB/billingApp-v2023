'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Person);
      // this.hasMany(models.Document);
      // this.hasMany(models.PaymentsLine);
    }
  }
  Payments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      checkNum: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      checkName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      checkDate: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: 'Payments',
    },
  )
  return Payments
}
