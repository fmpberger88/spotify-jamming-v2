require('dotenv').config();

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
const SESSION_SECRET = process.env.SESSION_SECRET || 'defaultSessionSecret';

module.exports = {
    CORS_ORIGIN,
    SESSION_SECRET
};
