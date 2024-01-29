const { Model, DataTypes } = require('sequelize');

class AlunoChamado extends Model {
static init(sequelize) {
    super.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        aluno_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mensagem: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Aberto', 'Fechado'),
            defaultValue: 'Aberto',
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'AlunoChamado',
        tableName: 'AlunoChamados'
    });
    console.log('AlunoChamado model initialized');
}

    static associate(models) {
        this.belongsTo(models.Aluno, { foreignKey: 'aluno_id', as: 'aluno'});
    }

}

module.exports = AlunoChamado;