const Materia = require('../models/Materia')
const Curso   = require('../models/Curso')

module.exports = {
    async index(req, res) {
        const materias = await Materia.findAll({include: { association: 'cursos'}})
        return res.render('admin/materia', {materias, layout: 'administrador'})
    },


    async carregarNovo(req, res) {

        const cursos = await Curso.findAll()

        res.render('admin/addmateria', {cursos, layout: 'administrador'})
    },


    async carregarEdicao(req, res) {
        const { id } = req.params;
        const materia = await Materia.findByPk(id);

        const materiaCursos = await materia.getCursos()
        const cursos = await Curso.findAll()

        function compararArraysDeObjetos(array1, array2) {
            const idsArray1 = array1.map(item => item.id);
            const idsArray2 = array2.map(item => item.id);
            
            const apenasEmArray1 = array1.filter(item => !idsArray2.includes(item.id));
            const apenasEmArray2 = array2.filter(item => !idsArray1.includes(item.id));
            
            return { apenasEmArray1, apenasEmArray2 };
          }
          
          // Comparar os resultados das consultas
          const comparacao = compararArraysDeObjetos(cursos, materiaCursos);
          
          const ausentes = comparacao.apenasEmArray1;
          
        return res.render('admin/editarmateria', {materia, materiaCursos, ausentes, layout: 'administrador'})
        
    },


    async store(req, res) {
        const {nome, carga_horaria, cursos} = req.body;
        const materia = await Materia.create({nome, carga_horaria})
        materia.addCursos(cursos)
        return res.redirect('/admin/materia')
    },


    async update(req, res) {
        
        const { id, nome, carga_horaria, cursos } = req.body;

        

       await Materia.update({
            nome, carga_horaria, cursos
        }, {
            where: { id }
        })

        const materia = await Materia.findByPk(id)


        materia.setCursos([])
        materia.addCursos(cursos)

        req.flash("success_msg", "Matéria alterada com sucesso!")
        return res.redirect('/admin/materia')        

        
    },


    async delete(req, res) {
        const { id } = req.params;
        const materia = await Materia.findByPk(id)
        if(!materia){
            req.flash("error_msg", "Matéria não encontrada")
            return res.redirect('/admin/materia')
        }else{
           await materia.destroy()
            req.flash("success_msg", "Matéria apagada com sucesso!")
            return res.redirect('/admin/materia')
        }
    }
}