require('dotenv').config({path:process.env.OLDPWD+'/.env'})
// DEV
const knex = require('knex')({
    client: process.env.DB_TYPE,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SELECT,
        port:process.env.DB_PORT
    },
    // debug: true
});

module.exports = knex
