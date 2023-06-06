'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Playgrounds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      html: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      css: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      js: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      profileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Profiles',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })

    await queryInterface.sequelize.query(`
      CREATE TRIGGER update_timestamp
      BEFORE UPDATE ON "Playgrounds"
      FOR EACH ROW
      EXECUTE PROCEDURE update_timestamp();
    `)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP TRIGGER update_timestamp ON "Playgrounds"')
    await queryInterface.dropTable('Playgrounds')
  },
}

