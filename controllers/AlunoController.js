const Aluno = require('../models/Aluno')
const Curso = require('../models/Curso')
const Usuario = require('../models/Usuario')

module.exports = {

    async  principal(req, res) {
            res.render('admin/principal', { layout: 'administrador'});
        },

    async index(req, res) {
        const alunos = await Aluno.findAll({
            include: { association: 'curso'}
        })
        return res.render('admin/aluno', {alunos, layout: 'administrador'})
    },


    async carregarNovo(req, res) {
        const cursos = await Curso.findAll()
        res.render('admin/addaluno', {cursos, layout: 'administrador'})
    },


    async carregarEdicao(req, res) {
        const { id } = req.params;
        const aluno = await Aluno.findByPk(id);
        const curso = await Curso.findByPk(aluno.curso_id)
        const cursos = await Curso.findAll();
        return res.render('admin/editaraluno', {aluno, cursos, curso, layout: 'administrador'})
    },


    async store(req, res) {
        const {matricula, status, curso_id, usuario_id} = req.body
        const curso = await Curso.findByPk(curso_id);
        if(!curso) {
            req.flash("error_msg", "Curso não cadastrado.")
            return res.redirect('/admin/aluno')
        }
        const aluno = await Aluno.create({matricula, status, curso_id, usuario_id})
        req.flash("success_msg", "Aluno cadastrado com sucesso!")
        return res.redirect('/admin/aluno')
    },


    async update(req, res) {
        const { id, matricula, status, curso_id, usuario_id } = req.body;

        await Aluno.update({
            nome, matricula, status, curso_id, usuario_id
        }, {
            where: { id }
        })

        req.flash("success_msg", "Aluno alterado com sucesso!")
        return res.redirect('/admin/aluno')
    },


    async delete(req, res) {
        const { id } = req.params;
        const aluno = await Aluno.findByPk(id)
        if(!aluno){
            req.flash("error_msg", "Aluno não encontrado")
            return res.redirect('/admin/aluno')
        }else{
           await aluno.destroy()
            req.flash("success_msg", "Aluno apagado com sucesso!")
            return res.redirect('/admin/aluno')
        }
    }
}