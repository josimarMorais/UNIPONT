const { Model, DataTypes } = require('sequelize')

class Vinculo extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'vinculo'
        })
    }
    static associate(models) {
        this.belongsTo(models.Curso, { foreignKey: 'curso_id', as: 'curso'})
    }
}

module.exports = Vinculo;