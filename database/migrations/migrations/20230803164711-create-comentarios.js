'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('comentarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },

      mensagem : {
        type: Sequelize.STRING(1000)
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
   await queryInterface.dropTable('comentarios');
  }
};
