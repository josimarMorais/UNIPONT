const express = require('express');
const router  = express.Router();

const { requireRole } = require('../middleware/authMiddleware');

const ControllerProfessor     = require('../controllers/professor/ControllerProfessor');

router.get('/inicio', requireRole('professor'), ControllerProfessor.inicio);



module.exports = router;