const pg = require('pg');
const path = require('path');
require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  pg.defaults.ssl = true;
}

// Set migration options. Here we have a single migration to rule them all
const migrations = {
  tableName: 'knex_migrations',
  directory: path.normalize(path.join(__dirname, '/migrations')),
};

// Set seed options. Here we have seed options for each environment
const seeds = {
  directory: path.normalize(path.join(__dirname, '/seeds')),
};

const POOL_MIN = process.env.DATABASE_POOL_MIN || 1;
const POOL_MAX = process.env.DATABASE_POOL_MAX || 10;

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min: parseInt(POOL_MIN, 10),
    max: parseInt(POOL_MAX, 10),
  },
  migrations,
  seeds,
};
