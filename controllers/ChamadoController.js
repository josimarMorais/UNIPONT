const AlunoChamado = require('../models/AlunoChamado');
const Aluno = require('../models/Aluno');


// Cria um novo chamado de aluno
const createAlunoChamado = async (req, res, next) => {
    try {
        // Recebe o corpo da requisição
        const userId = res.locals.user.id;
        // Mostrar no terminal da IDE o res.local.user.id
        console.log("userId: " + userId);
        const { mensagem } = req.body;
        console.log("Mensagem: " + mensagem);

        // Busca por Aluno com base na id de Usuário
        const aluno = await Aluno.findOne({ where: { usuario_id: userId } });

        if (!aluno) {
            return res.status(400).send('Aluno não encontrado');
        }

        const aluno_id = aluno.id;
        console.log("aluno_id: " + aluno_id);

        // Cria o chamado no banco de dados
        console.log(AlunoChamado);
        //Transformar mensagem em string
        let teste1 = JSON.stringify(mensagem);
        //Transformar aluno_id em integer
        let teste2 = parseInt(aluno_id);

        const chamadoTeste = new AlunoChamado({ mensagem: teste1, aluno_id: teste2, status: 'Aberto' });
        console.log(chamadoTeste);

        req.flash("success_msg", "Chamado cadastrado com sucesso!");
        return res.redirect('/aluno/inicio');

        //await AlunoChamado.create({ mensagem, aluno_id });

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