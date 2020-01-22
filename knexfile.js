require('dotenv').config({ path: './env' });
const url = require('url');

const getDatabaseConnectionFragments = url.parse(
  process.env.CLEARDB_DATABASE_URL
);
const getDatabaseConnectionValueByKey = key =>
  getDatabaseConnectionFragments && getDatabaseConnectionFragments[key];
const databaseHost = getDatabaseConnectionValueByKey('host');
const databaseAuth = getDatabaseConnectionValueByKey('auth').split(':');
const databasePath = getDatabaseConnectionValueByKey('pathname');
const databaseUser = databaseAuth[0];
const databasePass = databaseAuth[1];
const databaseName = databasePath.replace(/^\/+/, '');

const knexConfig = {
  client: 'mysql',
  connection: {
    host: databaseHost,
    user: databaseUser,
    database: databaseName,
    password: databasePass,
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
