const Comentario = require('../models/Comentario')

module.exports = {

    async store(req, res) {
        const {nome, mensagem} = req.body

        const novaMensagem = await Comentario.create({nome, mensagem})

        return res.json(novaMensagem)
    }

}