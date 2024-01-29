const Usuario = require('../models/Usuario')

module.exports = {

    // Procura usuários pelo nome
    async searchByName(req, res) {
        const { nome } = req.query
        const usuarios = await Usuario.findAll({
            where: {
                nome: {
                    [Op.like]: `%${nome}%`
                }
            }
        })
        return res.render('admin/usuario', { usuarios, layout: 'administrador'})        
    }
}