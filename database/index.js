const Sequelize = require('sequelize')
const dbConfig  = require('../config/database')

const Comentario = require('../models/Comentario')

const  connection = new Sequelize(dbConfig)

Comentario.init(connection)


//Verificando conexão com o bando de dados
try{
    connection.authenticate();
    console.log('conectado com sucesso ao Banco de Dados ')
} catch(error) {
    console.error('não foi possível conectar')
}

module.exports = connection