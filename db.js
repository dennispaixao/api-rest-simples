require("dotenv").config();
const pgp = require("pg-promise")();
const db = pgp(
  "postgres://dennis:MvdVtecDx4fazqVXBW0tBKTODbSKA79f@dpg-ckrv3810at9c73bt1lmg-a/api_rest_zgyn"
);

module.exports = db;
