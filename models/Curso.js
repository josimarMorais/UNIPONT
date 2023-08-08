const { Model, DataTypes } = require('sequelize')

class Curso extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            periodos: DataTypes.INTEGER
        }, {
            sequelize, 
        })
    }

    static associate(models) {
        this.hasMany(models.Aluno, { foreignKey: 'aluno_id', as: 'alunos'})
    }

}

module.exports = Curso;