const express = require('express')
const router = express.Router()

const FaleconoscoController = require('../controllers/FaleconoscoController')
const CursoController = require('../controllers/CursoController')
const ComentarioController = require('../controllers/ComentarioController')
const AlunoController = require('../controllers/AlunoController')
const ProfessorController = require('../controllers/ProfessorController')

router.get('/principal', (req, res) => { res.render('principal') })

//Rotas Professor
router.get('/professor', ProfessorController.index)
router.post('/professor/adicionar', ProfessorController.store)
router.get('/professor/adicionar', ProfessorController.carregarNovo)
router.get('/professor/editar/:id', ProfessorController.carregarEdicao)
router.post('/professor/editar', ProfessorController.update)
router.get('/professor/deletar/:id', ProfessorController.delete)


//Rotas Aluno
router.get('/aluno', AlunoController.index)
router.post('/aluno/adicionar', AlunoController.store)
router.get('/aluno/adicionar', AlunoController.carregarNovo)
router.get('/aluno/editar/:id', AlunoController.carregarEdicao)
router.post('/aluno/editar', AlunoController.update)
router.get('/aluno/deletar/:id', AlunoController.delete)

//Rotas Curso
router.get('/curso', CursoController.index)
router.post('/curso/adicionar', CursoController.store)
router.get('/curso/adicionar', CursoController.carregarNovo)
router.get('/curso/editar/:id', CursoController.carregarEdicao)
router.post('/curso/editar', CursoController.update)
router.get('/curso/deletar/:id', CursoController.delete)


//Rotas Comentários
router.get('/comentarios', ComentarioController.comentarioindex)
router.post('/comentarios/delete', ComentarioController.delete)


//Rotas FaleConosco
router.get('/faleadm', FaleconoscoController.admindex)
router.post('/fale/delete', FaleconoscoController.delete)


module.exports = router

