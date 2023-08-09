const Curso = require('../models/Curso')

module.exports = {
    async index(req, res) {
        const cursos = await Curso.findAll()
        return res.render('admin/curso', {cursos, layout: 'administrador'})
        
    },


    async carregarNovo(req, res) {
        res.render('admin/addcurso', {layout: 'administrador'})
    },

    
    async carregarEdicao(req, res) {
        const { id } = req.params;
        const curso = await Curso.findByPk(id)
        return res.render('admin/editarcurso', {curso, layout: 'administrador'})
    },


    async store(req, res) {
        const {nome, periodos} = req.body
        const cursos = await Curso.create({nome, periodos})
        req.flash("success_msg", "Curso cadastrado com sucesso!")
        return res.redirect('/admin/curso')
    },


    async update(req, res) {
        const { id, nome, periodos } = req.body;

        await Curso.update({
            nome, periodos
        }, {
            where: { id }
        })

        req.flash("success_msg", "Curso alterado com sucesso!")
        return res.redirect('/admin/curso')
    },


    async delete(req, res) {
        const { id } = req.params;
        const curso = await Curso.findByPk(id)
        if(!curso){
            req.flash("error_msg", "Curso não encontrado")
            return res.redirect('/admin/curso')
        }else{
           await curso.destroy()
            req.flash("success_msg", "Curso apagado com sucesso!")
            return res.redirect('/admin/curso')
        }
    }
}