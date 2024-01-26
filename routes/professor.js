const express = require('express');
const router  = express.Router();

const ControllerProfessor     = require('../controllers/professor/ControllerProfessor');

router.get('/inicio', ControllerProfessor.inicio);



module.exports = router;