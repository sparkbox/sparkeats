const dotenv = require('dotenv');
const url = require('url');

dotenv.config();

const getDatabaseConnectionFragments = url.parse(
  process.env.CLEARDB_DATABASE_URL
);
const getDatabaseConnectionValueByKey = key =>
  getDatabaseConnectionFragments && getDatabaseConnectionFragments[key];
const databaseHostname = getDatabaseConnectionValueByKey('hostname');
const databaseAuth = getDatabaseConnectionValueByKey('auth').split(':');
const databasePath = getDatabaseConnectionValueByKey('pathname');
const databasePort = getDatabaseConnectionValueByKey('port');
const databaseUser = databaseAuth[0];
const databasePass = databaseAuth[1];
const databaseName = databasePath.replace(/^\/+/, '');

const knexConfig = {
  client: 'mysql',
  connection: {
    host: databaseHostname,
    user: databaseUser,
    database: databaseName,
    password: databasePass,
    port: databasePort,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};

module.exports = {
  production: knexConfig,
  review: knexConfig,
  development: knexConfig,
};
