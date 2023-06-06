'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Playgrounds');
  },
  down: async (queryInterface, Sequelize) => {
  }
}
