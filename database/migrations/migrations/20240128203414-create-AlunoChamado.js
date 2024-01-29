'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AlunoChamados', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      aluno_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'alunos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      mensagem: {
        type: Sequelize.STRING(1000),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Aberto', 'Fechado'),
        allowNull: false,
        defaultValue: 'Aberto',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AlunoChamados');
  }
};

