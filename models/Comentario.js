const { Model, DataTypes } = require('sequelize')

class Comentario extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            mensagem: DataTypes.STRING(1000)
        }, {
            sequelize, 
        })
    }
}

module.exports = Comentario;