'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Adiciona a coluna de usuário_id à tabela Alunos
    await queryInterface.addColumn('alunos', 'usuario_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'Usuarios', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // Adiciona a relação de ForeignKey ao modelo Aluno
    await queryInterface.addConstraint('alunos', {
      fields: ['usuario_id'],
      type: 'foreign key',
      name: 'fk_alunos_usuarios',
      references: {
        table: 'Usuarios',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // Remove as colunas nome e telefone
    await queryInterface.removeColumn('alunos', 'nome');
    await queryInterface.removeColumn('alunos', 'telefone');
  },

  async down(queryInterface, Sequelize) {
    // Remove a coluna de usuário_id e a constraint de ForeignKey
    await queryInterface.removeConstraint('alunos', 'fk_alunos_usuarios');
    await queryInterface.removeColumn('alunos', 'usuario_id');

    // Adiciona as colunas de nome e telefone de volta
    await queryInterface.addColumn('alunos', 'nome', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('alunos', 'telefone', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};

