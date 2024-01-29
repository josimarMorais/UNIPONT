const Faleconosco = require('../models/Faleconosco')
const AlunoChamado = require('../models/AlunoChamado')

module.exports = {
    async index(req, res) {
        return res.render('fale')
    },

    async admindex(req, res) {
        const chamados = await AlunoChamado.findAll()
        return res.render('admin/fale', {chamados, layout: 'administrador'})
    },

    async store(req, res) {
        const {nome, email, mensagem} = req.body
        const fale = await Faleconosco.create({nome, email, mensagem})
        req.flash("success_msg", "Mensagem cadastrada com sucesso!")
        return res.redirect('/fale')
    },

    async delete(req, res) {
        const { id } = req.body;
        const fale = await AlunoChamado.findByPk(id)
        if(!fale){
            req.flash("error_msg", "Contato não encontrado")
            return res.redirect('/admin/faleadm')
        }else{
           await fale.destroy()
            req.flash("success_msg", "Solicitação de contato apagada com sucesso!")
            return res.redirect('/admin/faleadm')
        }
    }

}