const express = require('express');
const router  = express.Router();

const { requireRole } = require('../middleware/authMiddleware');

const ControllerAluno     = require('../controllers/aluno/ControllerAluno');

router.get('/inicio', requireRole('aluno'), ControllerAluno.inicio);


module.exports = router;