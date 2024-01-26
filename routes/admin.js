const express = require('express')
const router  = express.Router()


const FaleconoscoController = require('../controllers/FaleconoscoController')
const CursoController       = require('../controllers/CursoController')
const ComentarioController  = require('../controllers/ComentarioController')
const AlunoController       = require('../controllers/AlunoController')
const MateriaController     = require('../controllers/MateriaController')

const { requireRole } = require('../middleware/authMiddleware')


//Criado a rota que leva para a página principal da área administrativa.
router.get('/principal', requireRole('admin'), AlunoController.principal)

//Rotas Materia
router.get('/materia',  requireRole('admin'), MateriaController.index)
router.post('/materia/adicionar', requireRole('admin'), MateriaController.store)
router.get('/materia/adicionar', requireRole('admin'), MateriaController.carregarNovo)
router.get('/materia/editar/:id', requireRole('admin'), MateriaController.carregarEdicao)
router.post('/materia/editar', requireRole('admin'), MateriaController.update)
router.get('/materia/deletar/:id', requireRole('admin'), MateriaController.delete)


//Rotas Aluno
router.get('/aluno', requireRole('admin'), AlunoController.index)
router.post('/aluno/adicionar',  requireRole('admin'), AlunoController.store)
router.get('/aluno/adicionar', requireRole('admin'), AlunoController.carregarNovo)
router.get('/aluno/editar/:id', requireRole('admin'), AlunoController.carregarEdicao)
router.post('/aluno/editar', requireRole('admin'), AlunoController.update)
router.get('/aluno/deletar/:id', requireRole('admin'), AlunoController.delete)

//Rotas Curso
router.get('/curso', requireRole('admin'), CursoController.index)
router.post('/curso/adicionar', requireRole('admin'), CursoController.store)
router.get('/curso/adicionar', requireRole('admin'), CursoController.carregarNovo)
router.get('/curso/editar/:id', requireRole('admin'), CursoController.carregarEdicao)
router.post('/curso/editar', requireRole('admin'), CursoController.update)
router.get('/curso/deletar/:id', requireRole('admin'), CursoController.delete)


//Rotas Comentários
router.get('/comentarios', requireRole('admin'), ComentarioController.comentarioindex)
router.post('/comentarios/delete', requireRole('admin'), ComentarioController.delete)


//Rotas FaleConosco
router.get('/faleadm', requireRole('admin'), FaleconoscoController.admindex)
router.post('/fale/delete', requireRole('admin'), FaleconoscoController.delete)


module.exports = router

