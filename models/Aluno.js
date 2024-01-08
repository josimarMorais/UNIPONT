// Falta re-implementar a tabela aluno,
// já tem o usuário que é a base dos dados de todos
// então professor, aluno e adm serão os "roles" de um usuário
// que poderão ter atributos únicos dependendo de sua função
// basicamente o JWT irá autenticar o usuário e identificar sua "role" e assim,
// determinar com quais funções o usuário pode interagir.

// Aqui eu deletei alguns dados(campos/atributos) que já estavam
// presentes na tabela de Usuários, agora falta fazer a relação de aluno e usuário

const { Model, DataTypes } = require('sequelize')

class Aluno extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false },
            matricula: DataTypes.STRING,
            status: {
                type: DataTypes.ENUM('Ativo', 'Trancado', 'Cancelado'),
                defaultValue: 'Ativo',
            },
        }, {
            sequelize
        })
    }
    static associate(models) {
        this.belongsTo(models.Curso, { foreignKey: 'curso_id', as: 'curso'})
    }
}

module.exports = Aluno;