const { Model, DataTypes } = require('sequelize')

class Faleconosco extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            mensagem: DataTypes.STRING(1000)
        }, {
            sequelize,
            tableName: 'faleconosco'
        })
    }
}

module.exports = Faleconosco;