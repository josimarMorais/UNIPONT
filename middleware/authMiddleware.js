const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

//-----------------------------------------------------------------------------------------
//Exemplo de implementação do uso de Cookies JWT nas rotas:

//Você deve importar o middleware de autenticação no seu arquivo
//No exemplo abaixo eu estou importando a função de checar se está logado
//e outra que checa se tem permissão de alguma role(também logado).

//Ex: const { requireAuth, requireRole } = require('./middleware/authMiddleware')

//Agora vamos supor que quero que minha rota precise de autenticação de Administrador
//Logo após o '/admin', eu coloco a função de checagem: requireRole('admin')

//Ex: app.get('/admin', requireRole('admin'), (req, res) => {...})

//Caso eu apenas queira checar se o usuário está logado, mas não necessito de nenhuma
//permissão específica, posso utilizar o "requireAuth":

//Ex: app.get('/admin', requireAuth, (req, res) => {...})

//-----------------------------------------------------------------------------------------

// Para uso apenas no /login, se o usuário já está logado, redireciona para a homepage
const requireLoggedOut = (req, res, next) => {
    const token = req.cookies.jwt;

    //Verifica se o token existe
    if (token) {
        //Se o token existir, redireciona para a homepage e envia um erro
        res.redirect('/');
        res.status(401).send('Você já está logado.');
    } else {
        next();
    }
}

// Checa as credenciais do usuário para saber se ele está autenticado(logado)
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // Verifica se o token existe
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
}

//Checa se o usuário existe no banco de dados e retorna o objeto do usuário
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    //Verifica se o token existe
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                let user = await Usuario.findByPk(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
}

//Função para verificar se o usuário tem uma role específica e está logado.
const requireRole = (requiredRole) => async (req, res, next) => {
    const token = req.cookies.jwt;

    // Verifica se o token existe
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                let user = await Usuario.findByPk(decodedToken.id);
                
                // Checa se o usuário tem o role correto
                if (user && user.role === requiredRole) {
                    res.locals.user = user;
                    next();
                } else {
                    res.status(403).json({ error: 'Access forbidden: Insufficient privileges' });
                }
            }
        });
    } else {
        res.status(401).json({ error: 'Access forbidden: Insufficient privileges' });
    }
};

module.exports = { requireAuth, requireLoggedOut, checkUser, requireRole };