const AlunoChamado = require('../models/AlunoChamado');
const Aluno = require('../models/Aluno');


// Cria um novo chamado de aluno
const createAlunoChamado = async (req, res, next) => {
    try {

        // Recebe o corpo da requisição
        const userId = res.locals.user.id;
        const { mensagem } = req.body;

        // Mostrar no terminal da IDE o res.local.user.id
        console.log("MOSTRANDO O USERID: " + userId);

        // Mostrar no terminal da IDE o a mensagem passada pelo aluno.
        console.log("Mensagem: " + mensagem);

        // Busca por Aluno com base na id de Usuário
        const aluno = await Aluno.findOne({ where: { usuario_id: userId } });

        if (!aluno) {
            return res.status(400).send('Aluno não encontrado');
        }

        const aluno_id = aluno.id;
        console.log("aluno_id: " + aluno_id);

       const status = "Aberto";

        const chamadoTeste = await AlunoChamado.create({ aluno_id, mensagem, status });

        console.log(chamadoTeste);

        req.flash("success_msg", "Chamado cadastrado com sucesso!");
        return res.redirect('/aluno/inicio');

    } catch (error) {
        console.log(error);
        return res.status(400).send('Erro, não foi possível cadastrar o chamado');
    }
}

// Checa se o chamado existe por meio do id e retorna o objeto "AlunoChamado"
const findAlunoChamado = async (req, res, next) => {
    const { id } = req.body;
    const chamado = await AlunoChamado.findByPk(id);
    if(!chamado){
        return res.status(400).send('Chamado não encontrado');
    }else{
        return res.json(chamado);
    }
}

// Retorna todos os chamados e retorna o objeto "AlunoChamado"
const getAllAlunoChamado = async (req, res, next) => {
    const chamados = await AlunoChamado.findAll();
    if(!chamados){
        return res.status(400).send('Nenhum chamado encontrado');
    }else{
        return res.json(chamados);
    }
}

// Fecha o chamado
const closeAlunoChamado = async (req, res, next) => {
    const { id } = req.body;
    const chamado = await AlunoChamado.findByPk(id);
    if(!chamado){
        return res.status(400).send('Chamado não encontrado');
    }else{
        chamado.status = 'Fechado';
        await chamado.save();
        next();
    }
}

module.exports = {
    createAlunoChamado,
    findAlunoChamado,
    getAllAlunoChamado,
    closeAlunoChamado
}