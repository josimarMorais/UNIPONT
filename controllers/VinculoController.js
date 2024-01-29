const Vinculo = require('../models/Vinculo')
const Curso = require('../models/Curso')
module.exports = {


    async index(req, res) {
        const cursos = await Curso.findAll()
        return res.render('professor/vinculo', {cursos, layout: 'professor'})

    },

    async admindex(req, res) {
        try {
            const vincu = await Vinculo.findAll({
                include: { association: 'curso'}
            });
            return res.render('admin/vinculo', {vincu, layout: 'administrador'});
        } catch (error) {
            console.error('Erro ao consultar o banco de dados:', error);
            return res.status(500).send(`Erro interno do servidor: ${error.message}`);
        }
    },

async store(req, res) {

        try {
            const {curso_id, nome, email} = req.body

            console.log(nome, email, curso_id);

            const vinc = await Vinculo.create({curso_id, nome, email})


            req.flash("success_msg", "Solicitação de vínculo cadastrada com sucesso!")
            return res.redirect('/professor/inicio')
        }catch (error){
            console.log(error);
            res.status(400).send('Erro, não foi possível cadastrar o usuário');
        }

    },


    async delete(req, res) {
        const { id } = req.body;
        const vinc = await Vinculo.findByPk(id)
        if(!vinc){
            req.flash("error_msg", "Solicitação de vínculo encontrada")
            return res.redirect('/admin/vinculoadm')
        }else{
            await vinc.destroy()
            req.flash("success_msg", "Solicitação de vínculo apagada com sucesso!")
            return res.redirect('/admin/vinculoadm')
        }
    }

}