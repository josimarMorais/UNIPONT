const { Model, DataTypes } = require('sequelize')

class Aluno extends Model {
    static init(sequelize) {
                super.init({
            nome     : DataTypes.STRING,
            matricula: DataTypes.STRING,
            telefone : DataTypes.STRING
        }, {
            sequelize
        })
    }
    static associate(models) {
        this.belongsTo(models.Curso, { foreignKey: 'curso_id', as: 'curso'})
    }
}

module.exports = Aluno;