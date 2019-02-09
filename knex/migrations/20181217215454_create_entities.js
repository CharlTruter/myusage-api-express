
exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('entities', (table) => {
      table.bigincrements('id').primary();
      table.string('name').notNullable();
      table.string('friendly_name');
      table.bigInteger('realm_id').notNullable();
      table.timestamps(false, true);
    }),
  ])
);

exports.down = (knex) => {
  knex.schema.dropTable('entities');
};
