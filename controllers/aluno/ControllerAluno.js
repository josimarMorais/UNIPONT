const Aluno = require('../../models/Aluno');

module.exports = { 

    // Página inicial
    inicio(req, res){
        return res.render('aluno/inicio', { layout: 'aluno'});

    },

    // Página para abrir um chamado.
    chamado(req, res){
        return res.render('aluno/chamado', { layout: 'aluno'});
    }

}