'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Playground extends Model {
    static associate(models) {
      Playground.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }

  Playground.init({
    html: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    css: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    js: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Playground',
  })

  return Playground
}
