const { Model, DataTypes } = require('sequelize')

class Aluno extends Model {
    static init(sequelize) {
        super.init({
            nome     : DataTypes.STRING,
            matricula: DataTypes.INTEGER,
            telefone : DataTypes.INTEGER
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Curso, { foreignKey: 'aluno_id', as: 'curso'})
    }
}

module.exports = Aluno;