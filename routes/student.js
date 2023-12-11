// routes/student.js

// A ideia deste arquivo é a de definir as rotas referentes aos usuários do tipo Aluno.

//Importando os módulos
const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/users/student/studentController');

// Rotas
router.get('/mycourses', StudentController.myCourses);
router.get('/addcourses', StudentController.addCourses);
router.get('/leavecourses', StudentController.leaveCourses);

// Exportar o módulo
module.exports = router;

