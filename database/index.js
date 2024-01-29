const Sequelize = require('sequelize')
const dbConfig  = require('../config/database')

const Comentario  = require('../models/Comentario')
const Faleconosco = require('../models/Faleconosco')
const Curso       = require('../models/Curso')
const Aluno       = require('../models/Aluno')
const Materia     = require('../models/Materia')
const Usuario     = require('../models/Usuario')
const Vinculo     = require('../models/Vinculo')
const UsuarioChamado = require('../models/AlunoChamado') 

const  connection = new Sequelize(dbConfig)

Comentario.init(connection)
Faleconosco.init(connection)
Curso.init(connection)
Aluno.init(connection)
Materia.init(connection)
Usuario.init(connection)
Vinculo.init(connection)
UsuarioChamado.init(connection)


Aluno.associate(connection.models)
Curso.associate(connection.models)
Materia.associate(connection.models)
Vinculo.associate(connection.models)

//Verificando conexão com o bando de dados
async function setupDatabaseConnection(){
    try{
        await connection.authenticate();
        console.log('conectado com sucesso ao Banco de Dados ')
    } catch(error) {
        console.error('não foi possível conectar')
    }
}

setupDatabaseConnection();

module.exports = connection