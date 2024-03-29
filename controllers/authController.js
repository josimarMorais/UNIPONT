//Implemenando as rotas de autenticação do arquivo authRoutes.js

//Importando o model de Usuário
const Aluno = require('../models/Aluno');
const Usuario = require('../models/Usuario');

//Importando JWT
const jwt = require('jsonwebtoken');

//Utilizando o .env
require('dotenv').config({ path: '../.env' }); 

//JWT
//Coloque aqui o tempo em segundo para a sessão do usuário expirar.
const maxAge = 120;

const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: maxAge * 1000});
}


//Rotas de Signup
module.exports.signup_get = (req, res) => {
    //Renderiza o arquivo signup
    res.render('signup', {layout: "administrador"});
};

module.exports.signup_post = async (req, res) => {
    const { nome, email, senha, role } = req.body;
    try {
        const user = await Usuario.create({ nome, email, senha, role });

        //Bloco comentado pois a ideia é que apenas um ADM crie os usuários, então não seria necessário
        //criar os tokens para os usuários no cadastro, apenas no login.
        //caso queira utilizar cookies no cadastro, remova os comentários abaixo.
        //Cria o token JWT
        // const token = createToken(user.id, user.role);
        //Envia a resposta com o token
        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        //Status 201 indica que o usuário foi criado

        res.status(201).json({ user });

    } catch (error) {
        console.log(error);
        res.status(400).send('Erro, não foi possível cadastrar o usuário');
    }
};

// Rotas de Signup de Aluno
module.exports.signup_aluno_post = async (req, res) => {    
    // Recebe os parametros de Usuario e do Aluno(matrícula e curso)
    const { nome, email, senha, role, matricula, curso } = req.body;
    try {
        // Cria o usuário primeiro
        const user = await Usuario.create({ nome, email, senha, role });
        // Cria o aluno com a referência ao usuário
        const aluno = await Aluno.create({ matricula, user_id: user.id, curso_id: curso });
        // Por algum motivo o aluno não consegue salvar o id do usuário no campo usuario_id
        // Então aqui eu forço a solução
        aluno.usuario_id = user.id;
        await aluno.save();
        res.status(201).json({ user, aluno });
    } catch (error) {
        console.log(error);
        res.status(400).send('Erro, não foi possível cadastrar o usuário');
    }
}



//Rotas de Login
module.exports.login_get = (req, res) => {
    //Renderiza o arquivo login
    res.render('login');
};

module.exports.login_post = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await Usuario.login(email, senha);
        const token = createToken(user.id, user.role);

        //Envia a resposta com o token
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        //Verifica o role do usuário e redireciona para a rota correspondente
        if (user.role === 'admin') {
            return res.redirect('../admin/principal');
        } else if (user.role === 'aluno') {
            console.log('aluno');
           return res.redirect('../aluno/inicio');
        } else if (user.role === 'professor') {
           return res.redirect('../professor/inicio');
        }
        res.status(200);
    } catch (error) {
        console.log(error);
        res.status(400).send('Email ou senha inválidos');
    }
};

//Rota de Logout
module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('login');
};