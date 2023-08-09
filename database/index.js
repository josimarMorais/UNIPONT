const Sequelize = require('sequelize')
const dbConfig  = require('../config/database')

const Comentario  = require('../models/Comentario')
const Faleconosco = require('../models/Faleconosco')
const Curso       = require('../models/Curso')
const Aluno       = require('../models/Aluno')

const  connection = new Sequelize(dbConfig)

Comentario.init(connection)
Faleconosco.init(connection)
Curso.init(connection)
Aluno.init(connection)

Aluno.associate(connection.models)
Curso.associate(connection.models)

//Verificando conexão com o bando de dados
try{
    connection.authenticate();
    console.log('conectado com sucesso ao Banco de Dados ')
} catch(error) {
    console.error('não foi possível conectar')
}

module.exports = connection