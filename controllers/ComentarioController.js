const Comentario = require('../models/Comentario')

module.exports = {
    async index(req, res) {
        const comentarios = await Comentario.findAll()
        
        return res.render('comentarios', {comentarios})
        
    },


    async store(req, res) {
        const {nome, mensagem} = req.body
        const comentario = await Comentario.create({nome, mensagem})
        req.flash("success_msg", "Mensagem cadastrada com sucesso!")
        return res.redirect('/comentarios')
    }
}