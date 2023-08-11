const Comentario = require('../models/Comentario')

module.exports = {
    async index(req, res) {
        const comentarios = await Comentario.findAll()
        return res.render('comentarios', {comentarios})
    },

    async comentarioindex(req, res) {
        const comentarios = await Comentario.findAll()
        return res.render('admin/comentarios', {comentarios, layout: 'administrador'})
    },

    async store(req, res) {
        const {nome, mensagem} = req.body
        const comentario = await Comentario.create({nome, mensagem})
        req.flash("success_msg", "Mensagem cadastrada com sucesso!")
        return res.redirect('/comentarios')
    },

    async delete(req, res) {
        const { id } = req.body;
        const comentario = await Comentario.findByPk(id)
        if(!comentario){
            req.flash("error_msg", "Mensagem não encontrada")
            return res.redirect('/admin/comentarios')
        }else{
           await comentario.destroy()
            req.flash("success_msg", "Mensagem apagada com sucesso!")
            return res.redirect('/admin/comentarios')
        }
    }
}