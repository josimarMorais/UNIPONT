const express = require('express');
const router  = express.Router();

const { requireRole } = require('../middleware/authMiddleware');

const ControllerProfessor     = require('../controllers/professor/ControllerProfessor');
const VinculoController     = require('../controllers/VinculoController');

router.get('/inicio', requireRole('professor'), ControllerProfessor.inicio);
router.get('/vinculo', requireRole('professor'), VinculoController.index);
router.post('/novovinculo', requireRole('professor'), VinculoController.store);

module.exports = router;