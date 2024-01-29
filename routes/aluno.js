const express = require('express');
const router  = express.Router();

const { requireRole } = require('../middleware/authMiddleware');
const ControllerAluno = require('../controllers/aluno/ControllerAluno');
const ChamadoController = require('../controllers/ChamadoController');

router.get('/inicio', requireRole('aluno'), ControllerAluno.inicio);

//Rotas de chamado
router.post('/chamado', requireRole('aluno'), ChamadoController.createAlunoChamado);
router.get('/chamado', requireRole('aluno'), ControllerAluno.chamado);


module.exports = router;