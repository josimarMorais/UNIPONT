const Sequelize = require('sequelize')
const dbConfig  = require('../config/database')

const Comentario  = require('../models/Comentario')
const Faleconosco = require('../models/Faleconosco')
const Curso       = require('../models/Curso')
const Aluno       = require('../models/Aluno')
const Materia     = require('../models/Materia')

//Rotas de autenticação de usuário
const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const ErrorHandler = require('../middleware/error.middleware');
const AuthGuard = require('../middleware/auth.middleware');
const schema = require('../validatons/auth.validation');
const validate = require('../utils/validator.util');

router.post('/register', validate(schema.register), ErrorHandler(AuthController.register));
router.post('/login',    validate(schema.login),    ErrorHandler(AuthController.login));
router.get('/user',      AuthGuard,                 ErrorHandler(AuthController.getUser));
router.get('/logout',    AuthGuard,                 ErrorHandler(AuthController.logout));

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;
//Fim rotas de autenticação de usuário

const  connection = new Sequelize(dbConfig)

Comentario.init(connection)
Faleconosco.init(connection)
Curso.init(connection)
Aluno.init(connection)
Materia.init(connection)

Aluno.associate(connection.models)
Curso.associate(connection.models)
Materia.associate(connection.models)

//Verificando conexão com o bando de dados
try{
    connection.authenticate();
    console.log('conectado com sucesso ao Banco de Dados ')
} catch(error) {
    console.error('não foi possível conectar')
}

module.exports = connection