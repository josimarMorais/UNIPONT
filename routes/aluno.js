const express = require('express');
const router  = express.Router();

const { requireRole, checkUser } = require('../middleware/authMiddleware');
const ControllerAluno = require('../controllers/aluno/ControllerAluno');
const AlunoChamadoController = require('../controllers/AlunoChamadoController');

router.get('/inicio', requireRole('aluno'), ControllerAluno.inicio);

//Rotas de chamado
router.post('/chamado', checkUser, requireRole('aluno'), AlunoChamadoController.createAlunoChamado);
router.get('/chamado', requireRole('aluno'), ControllerAluno.chamado);


module.exports = router;