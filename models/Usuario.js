const { Model, DataTypes } = require('sequelize')

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false },
            nome: {
                type: DataTypes.STRING,
                allowNull: false },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true },
            senha: {
                type: DataTypes.STRING,
                allowNull: false },
            role: {
                type: DataTypes.ENUM('admin', 'aluno', 'professor'),
                defaultValue: 'aluno' },          
        },
        {
            sequelize,
            modelName: 'Usuario',
            tableName: 'Usuarios'
        })
    }
}

//método estático de login
Usuario.login = async function(email, senha) {
    //acha o usuario com o email passado
    const usuario = await this.findOne({ where: { email } })
    if (usuario) {
        //verifica a senha
        const comparaSenha = await usuario.senha === senha;
        //retorna o usuario caso a senha esteja correta
        if (comparaSenha) {
            return usuario
        }
        throw new Error('Email ou senha inválidos');
    }
    throw new Error('Email ou senha inválidos');
}


module.exports = Usuario;