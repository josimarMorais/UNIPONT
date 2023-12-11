module.exports = {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "Claudia@240100",
    database: process.env.DB_NAME || "unidb",
    define: {
        timestamps: true,
        underscored: true
    }
}