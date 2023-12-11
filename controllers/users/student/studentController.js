// controllers/users/student/studentController.js

module.exports = {
    myCourses(req, res) {
      // Lógica para carregar e exibir cursos do aluno
      // Utilize Aluno.findByPk(req.user.id) ou outra lógica dependendo da autenticação
      res.render('student/mycourses', { layout: 'student' });
    },
  
    addCourses(req, res) {
      // Lógica para carregar e exibir todos os cursos disponíveis
      // e permitir que o aluno escolha cursos para adicionar
      res.render('student/addcourses', { layout: 'student' });
    },
  
    leaveCourses(req, res) {
      // Lógica para carregar e exibir cursos do aluno
      // e permitir que o aluno escolha cursos para trancar
      res.render('student/leavecourses', { layout: 'student' });
    },
  };
  