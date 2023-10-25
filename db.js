require("dotenv").config();
const pgp = require("pg-promise")();
const db = pgp(process.env.CONNECTION_STRING);

module.exports = db;
