'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Playground extends Model {
    static associate(models) {
      Playground.belongsTo(models.Profile, { foreignKey: 'profileId' })
    }
  }

  Playground.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Profiles',
        key: 'id',
      },
    }
  },
    {
      sequelize,
      modelName: 'Playground',
    })

  return Playground
}
