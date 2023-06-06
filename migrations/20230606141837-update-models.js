'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Playgrounds', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    await queryInterface.addColumn('Playgrounds', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    })

    await queryInterface.removeConstraint('Playgrounds', 'Playgrounds_userId_fkey');

    await queryInterface.removeColumn('Playgrounds', 'userId')

    await queryInterface.addColumn('Playgrounds', 'profileId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Profiles',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Playgrounds', 'name')
    await queryInterface.removeColumn('Playgrounds', 'updated_at')
    await queryInterface.removeColumn('Playgrounds', 'profileId')

    await queryInterface.addColumn('Playgrounds', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    })
    await queryInterface.addConstraint('Playgrounds', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'Playgrounds_userId_fkey',
      references: {
        table: 'Users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  }
}
