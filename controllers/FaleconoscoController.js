const Faleconosco = require('../models/Faleconosco')

module.exports = {

    async index(req, res) {
        return res.render('fale')
    },

    async admindex(req, res) {
        const fales = await Faleconosco.findAll()
        return res.render('admin/fale', {fales, layout: 'administrador'})
    },

    async store(req, res) {
        const {nome, email, mensagem} = req.body
        const fale = await Faleconosco.create({nome, email, mensagem})
        req.flash("success_msg", "Mensagem cadastrada com sucesso!")
        return res.redirect('/fale')
    },

    async delete(req, res) {
        const { id } = req.body;

        console.log('Número do ID: ' + id)
        
        const fale = await Faleconosco.findByPk(id)

        if(!fale){
            req.flash("error_msg", "Contato não encontrado")
            return res.redirect('/admin/fale')
        }else{
            fale.destroy()
            req.flash("success_msg", "Solicitação de contato apagada com sucesso!")
            return res.redirect('/admin/fale')
        }

        
    }

}