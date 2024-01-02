const Professor = require('../models/Professor')
const Curso = require('../models/Curso')

module.exports = {
    async index(req, res) {
        const professores = await Professor.findAll({ include: { association: 'cursos' } })
        return res.render('admin/professor', { professores, layout: 'administrador' })
    },


    async carregarNovo(req, res) {

        const cursos = await Curso.findAll()

        res.render('admin/addprofessor', { cursos, layout: 'administrador' })
    },


    async carregarEdicao(req, res) {
        const { id } = req.params;
        const professor = await Professor.findByPk(id);

        const professorCursos = await professor.getCursos()
        const cursos = await Curso.findAll()

        function compararArraysDeObjetos(array1, array2) {
            const idsArray1 = array1.map(item => item.id);
            const idsArray2 = array2.map(item => item.id);

            const apenasEmArray1 = array1.filter(item => !idsArray2.includes(item.id));
            const apenasEmArray2 = array2.filter(item => !idsArray1.includes(item.id));

            return { apenasEmArray1, apenasEmArray2 };
        }

        // Comparar os resultados das consultas
        const comparacao = compararArraysDeObjetos(cursos, professorCursos);

        const ausentes = comparacao.apenasEmArray1;

        return res.render('admin/editarprofessor', { professor, professorCursos, ausentes, layout: 'administrador' })

    },


    async store(req, res) {
        const { nome, carga_horaria, cursos } = req.body;
        const professor = await Professor.create({ nome, carga_horaria })
        professor.addCursos(cursos)
        return res.redirect('/admin/professor')
    },


    async update(req, res) {

        const { id, nome, carga_horaria, cursos } = req.body;
        console.log("O ID É: " + id);




        await Professor.update({
            nome, carga_horaria, cursos
        }, {
            where: { id }
        })

        const professor = await Professor.findByPk(id)


        professor.setCursos([])
        professor.addCursos(cursos)

        req.flash("success_msg", "Professor alterado com sucesso!")
        return res.redirect('/admin/professor')


    },


    async delete(req, res) {
        const { id } = req.params;
        const professor = await Professor.findByPk(id)
        if (!professor) {
            req.flash("error_msg", "Professor não encontrado")
            return res.redirect('/admin/professor')
        } else {
            await professor.destroy()
            req.flash("success_msg", "Professor apagado com sucesso!")
            return res.redirect('/admin/professor')
        }
    }
}