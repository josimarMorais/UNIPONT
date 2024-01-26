const express = require('express')
const router  = express.Router()

const FaleconoscoController = require('../controllers/FaleconoscoController')
const CursoController       = require('../controllers/CursoController')
const ComentarioController  = require('../controllers/ComentarioController')
const AlunoController       = require('../controllers/AlunoController')
const MateriaController     = require('../controllers/MateriaController')


//Criado a rota que leva para a página principal da área administrativa.
router.get('/principal', AlunoController.principal)

//Rotas Materia
router.get('/materia', MateriaController.index)
router.post('/materia/adicionar', MateriaController.store)
router.get('/materia/adicionar', MateriaController.carregarNovo)
router.get('/materia/editar/:id', MateriaController.carregarEdicao)
router.post('/materia/editar', MateriaController.update)
router.get('/materia/deletar/:id', MateriaController.delete)


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

