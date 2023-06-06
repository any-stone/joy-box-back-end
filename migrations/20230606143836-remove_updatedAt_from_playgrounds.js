'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Playgrounds', 'updatedAt')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Playgrounds', 'updatedAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    })
  }
}

