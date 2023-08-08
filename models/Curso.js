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
}

module.exports = Curso;