const env = require('dotenv').config();

module.exports = {
    APP_PORT: process.env.APP_PORT || 3000,

    APP_ENV: process.env.APP_ENV || 'local',

    APP_KEY: process.env.APP_KEY || 'cRfUjWnZr4u7x!A%',

    DB_URL:
        process.env.DB_URL ||
        'mongodb+srv://sukkoth:sukkoth@myblog.a5ccukp.mongodb.net/BlogAPI',
};