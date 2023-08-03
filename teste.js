const Sequelize = require('sequelize')
const sequelize = new Sequelize('unibd', 'root', '123456789', {
    host: "localhost",
    dialect : "mysql"
})

sequelize.authenticate().then(() => {
    console.log("conectado com sucesso.")
}).catch((erro) => {
    console.log("Falha ao se conectar " + erro)
})


const Postagem = sequelize.define('postagens', {
    titulo : {
        type: Sequelize.STRING
    },
    mensagem : {
        type: Sequelize.TEXT
    }
})

Postagem.sync()