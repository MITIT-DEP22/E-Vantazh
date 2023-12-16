module.exports = {
    DATABASE_NAME: process.env.DATABASE_NAME || "postgres",
    DATABASE_USER: process.env.DATABASE_USER || "root",
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "password",
    DATABASE_OPTIONS: {
        host: process.env.DATABASE_HOST || "localhost",
        dialect: process.env.DATABASE_DIALECT || "postgres",
        logging: false,
    }
};