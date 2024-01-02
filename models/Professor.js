const { Model, DataTypes } = require('sequelize')

class Professor extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            carga_horaria: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'materias'
        })
    }
    static associate(models) {
        this.belongsToMany(models.Curso, { foreignKey: 'materia_id', through: 'cursos_materias', as: 'cursos' })
    }
}

module.exports = Professor;