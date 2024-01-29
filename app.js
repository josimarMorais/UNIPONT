//Carregando os módulos
    const express    = require('express');
    const path       = require('path');
    const bodyparser = require('body-parser');
    const handlebars = require('express-handlebars');
    const session    = require("express-session");
    const flash      = require("connect-flash");
    
    // Importando as rotas do administrativo
    const admin      = require('./routes/admin');

    //Importando as rotas dos Alunos
    const aluno = require('./routes/aluno');

    // Importando as rotas do professor
    const professor = require('./routes/professor');

    //Importando as rotas de autenticação
    const authRoutes = require('./routes/authRoutes');
    const { checkUser } = require('./middleware/authMiddleware');

    //Importando as rotas de Cursos
    const CursoRoutes = require('./routes/CursoRoutes');

    //Cookie Parser
    const cookieParser = require('cookie-parser');

    require('dotenv').config();
    
    const app        = express();
    const PORT       = process.env.PORT || 3000;
    
    //Configurações e importações de Módulos referente ao banco de dados
    require('./database');
    const ComentarioController = require('./controllers/ComentarioController');
    const FaleconoscoController = require('./controllers/FaleconoscoController');

//Configurações dos módulos
    //Sessão
        app.use(session({
            secret: "chave",
            resave: true,
            saveUninitialized: true
        }));

        app.use(flash());
    
    //Middleware para trabalhar com as sessões
        app.use(( req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg   = req.flash("error_msg")
            next();
        });

    //Public
        app.use(express.static(path.join(__dirname,"public")));

    //Body Parser
        app.use(bodyparser.urlencoded({extended: true}));
        app.use(bodyparser.json());

    //Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main', 
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true
           }
        }));
        app.set('view engine', 'handlebars');

    //Express json
        app.use(express.json());


// MIDDLEWARE
    app.use(cookieParser());
    app.get('*', checkUser);
 


//ROTAS
    app.get('/', (req, res) => {
        res.render('home', {layout: 'main'});
    });

    app.get('/home', (req, res) => {
        res.render("home")
    })

    app.get('/noticias', (req, res) => {
        res.render('noticias')
    })


    app.get('/comentarios', ComentarioController.index)
    app.post('/novocomentario', ComentarioController.store)
    
    app.post('/novocontato', FaleconoscoController.store)
    app.get('/fale', FaleconoscoController.index)


//rotas da parte do administrador
    app.use('/admin', admin);

//rotas da parte do aluno
    app.use('/aluno', aluno);

//rotas da parte do professor
    app.use('/professor', professor);

// Rotas de Autenticação
    app.use('/auth', authRoutes);

// Rotas de Cursos
    app.use('/cursos', CursoRoutes);

//OUTROS
    app.listen(PORT, () => {
        console.log(`App rodando na porta ${PORT}`);
    });