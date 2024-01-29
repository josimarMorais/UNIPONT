//Rotas de autenticação que são implementadas no authController.js e utilizadas pelo app.js

//Importando middleware
const { requireLoggedOut, requireAuth , checkUser } = require('../middleware/authMiddleware');

//Router requer o express
const { Router } = require('express');

//Importar o controller de autenticação
const authController = require('../controllers/authController');

//Cria uma instãncia de Router
const router = Router();

//Anexar diferentes rotas ao router.
//Signup
router.get('/signup', authController.signup_get);

router.post('/signup', authController.signup_post);

router.post('/signup/aluno', authController.signup_aluno_post);

//Login
router.get('/login', requireLoggedOut, authController.login_post);

router.post('/login', authController.login_post);

//Logout
router.get('/logout', requireAuth, authController.logout_get);

//Exporta o router para uso no app.js
module.exports = router;