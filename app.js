//Carregando os módulos
    const express    = require('express');
    const path       = require('path');
    const bodyparser = require('body-parser')
    const handlebars = require('express-handlebars')
    const admin      = require('./routes/admin')
    const session    = require("express-session")
    const flash      = require("connect-flash")
    
    const app        = express();
    const port       = 3000;
    
    //Configurações e importações de Módulos referente ao banco de dados
    require('./database');
    const ComentarioController = require('./controllers/ComentarioController')


//Configurações dos módulos
    //Sessão
        app.use(session({
            secret: "chave",
            resave: true,
            saveUninitialized: true
        }))

        app.use(flash())
    
    //Middleware para trabalhar com as sessões
        app.use(( req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg   = req.flash("error_msg")
            next()
        })

    //Public
        app.use(express.static(path.join(__dirname,"public")))

    //Body Parser
        app.use(bodyparser.urlencoded({extended: true}))
        app.use(bodyparser.json())
    
    //Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main', 
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true
           }
        }))
        app.set('view engine', 'handlebars')

    //Express json
        app.use(express.json())




//ROTAS
    //Variável para salvar os comentários
    var comentarios = []

    app.get('/', (req, res) => {
        res.render('home', {layout: 'main'});
    });

    app.get('/home', (req, res) => {
        res.render("home")
    })

    app.get('/noticias', (req, res) => {
        res.render('noticias')
    })

    app.get('/fale', (req, res) => {
        res.render('fale')
    })

    app.get('/comentarios', (req, res) => {
        res.render('comentarios', {comentarios : comentarios})
    })

    app.get('/login', (req, res) => {
        res.render('login')
    })

    app.post('/novocontato', (req, res) => {
        console.log("\nNOVA SOLICITAÇÃO DE CONTATO\n")
        console.log("Nome: " + req.body.nome)
        console.log("Email: " + req.body.email)
        console.log("Mensagem: " + req.body.mensagem)
        res.redirect('home')
    })

    app.post('/testecomentario', ComentarioController.store)

    app.post('/novocomentario', (req, res) => {
        var comentario = {
            "nome": req.body.nome,
            "mensagem" :  req.body.mensagem
        }
        comentarios.push(comentario)
        res.render('comentarios', {comentarios : comentarios})
    })

    app.post('/login', (req, res) => {
        if(req.body.email == "adm" && req.body.senha == 123){
            res.redirect('/principal')
        }else {
            req.flash("error_msg", "E-mail ou senha inválidos")
            res.redirect('login')
        }
    })

    app.get('/principal', (req, res) => {
        res.render('admin/principal', {layout: 'administrador'})
    })

    //rotas da parte do administrador
    app.use('/admin', admin)

//OUTROS
    app.listen(port, () => {
        console.log(`App rodando na porta ${port}`);
    });