const Knex = require('knex');
const connection = require('../knex/knexfile');

export default (callback) => {
  const knexConnection = Knex(connection);
  callback(knexConnection);
};
