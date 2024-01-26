const express = require('express')
const router  = express.Router()


const FaleconoscoController = require('../controllers/FaleconoscoController')
const CursoController       = require('../controllers/CursoController')
const ComentarioController  = require('../controllers/ComentarioController')
const AlunoController       = require('../controllers/AlunoController')
const MateriaController     = require('../controllers/MateriaController')

const { requireRole, checkUser } = require('../middleware/authMiddleware')

const cookieParser = require('cookie-parser');

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

