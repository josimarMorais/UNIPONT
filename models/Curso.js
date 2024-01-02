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
        this.hasMany(models.Aluno, { foreignKey: 'curso_id', as: 'alunos' })
        this.belongsToMany(models.Professor, { foreignKey: 'curso_id', through: 'cursos_materias', as: 'materias' })
    }

}

module.exports = Curso;