const express = require('express')
const router  = express.Router()

const FaleconoscoController = require('../controllers/FaleconoscoController')
const CursoController       = require('../controllers/CursoController')

router.get('/principal', (req, res) => {
    res.render('principal')
})

router.get('/aluno', (req, res) => {
    res.render('admin/aluno', {layout: 'administrador'})
})

router.get('/materia', (req, res) => {
    res.render('admin/materia', {layout: 'administrador'})
})


//Rotas Curso
router.get('/curso', CursoController.index)
router.post('/curso/adicionar', CursoController.store)
router.get('/curso/adicionar', CursoController.carregarNovo)
router.get('/curso/editar/:id', CursoController.carregarEdicao)
router.post('/curso/editar', CursoController.update)
router.get('/curso/deletar/:id', CursoController.delete)




//Rotas fale
router.get('/faleadm', FaleconoscoController.admindex)
router.post('/fale/delete', FaleconoscoController.delete)

module.exports = router

