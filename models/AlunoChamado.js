const { Model, DataTypes } = require('sequelize')

class AlunoChamado extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            aluno_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            mensagem: {
                type: DataTypes.STRING(1000),
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM('Aberto', 'Fechado'),
                allowNull: false,
                defaultValue: 'Aberto',
            }
        }, {
            sequelize,
            modelName: 'AlunoChamado',
            tableName: 'AlunoChamados'
        });
    }

    static associate(models) {
        this.belongsTo(models.Aluno, { foreignKey: 'aluno_id', as: 'aluno' });
    }
}

module.exports = AlunoChamado;