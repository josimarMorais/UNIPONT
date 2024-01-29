// Rotas de Cursos

//Router requer o express
const { Router } = require('express');

//Importar o controller de Cursos
const CursoController = require('../controllers/CursoController');

//Cria uma instãncia de Router
const router = Router();

// Retorna todos os cursos usando a getAll do controller
router.get('', async (req, res) => {
    await CursoController.getAll(req, res);
});

module.exports = router;