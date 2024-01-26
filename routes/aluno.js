const express = require('express');
const router  = express.Router();

const ControllerAluno     = require('../controllers/aluno/ControllerAluno');

router.get('/inicio', ControllerAluno.inicio);


module.exports = router;