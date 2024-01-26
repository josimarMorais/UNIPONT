

module.exports = { 

    inicio(req, res){
        return res.render('professor/inicio', { layout: 'professor'});
    }
}