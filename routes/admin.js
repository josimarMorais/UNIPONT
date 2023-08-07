const express = require('express')
const router  = express.Router()

const FaleconoscoController = require('../controllers/FaleconoscoController')


router.get('/principal', (req, res) => {
    res.render('principal')
})

router.get('/aluno', (req, res) => {
    res.render('admin/aluno', {layout: 'administrador'})
})

router.get('/curso', (req, res) => {
    res.render('admin/curso', {layout: 'administrador'})
})

router.get('/materia', (req, res) => {
    res.render('admin/materia', {layout: 'administrador'})
})


router.get('/fale', FaleconoscoController.admindex)
router.post('/fale/delete', FaleconoscoController.delete)




module.exports = router

