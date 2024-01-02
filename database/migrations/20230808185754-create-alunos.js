'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('alunos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      curso_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'cursos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },

      matricula: {
        type: Sequelize.STRING,
        allowNull: false
      },

      telefone: {
        type: Sequelize.STRING,
        allowNull: false
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('alunos');
  }
};