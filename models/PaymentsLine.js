'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PaymentsLine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.Payments);
    }
  }
  PaymentsLine.init(
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
      }
    },
    {
      sequelize,
      modelName: 'PaymentsLine',
    },
  )
  return PaymentsLine
}
