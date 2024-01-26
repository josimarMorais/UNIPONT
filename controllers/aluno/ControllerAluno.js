const Aluno = require('../../models/Aluno');

module.exports = { 

    inicio(req, res){
        return res.render('aluno/inicio', { layout: 'aluno'});

    }

}