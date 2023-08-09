const Materia = require('../models/Materia')
const Curso   = require('../models/Curso')

module.exports = {
    async index(req, res) {
        const materias = await Materia.findAll( )
        return res.render('admin/materia', {materias, layout: 'administrador'})
    },


    async carregarNovo(req, res) {

        const cursos = await Curso.findAll()

        res.render('admin/addmateria', {cursos, layout: 'administrador'})
    },


    async carregarEdicao(req, res) {
        
    },


    async store(req, res) {
        
    },


    async update(req, res) {
        
    },


    async delete(req, res) {
        
    }
}