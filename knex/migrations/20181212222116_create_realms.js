
exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('realms', (table) => {
      table.bigincrements('id').primary();
      table.string('name').notNullable();
      table.string('user_id').notNullable();
      table.boolean('enabled').notNullable();
      table.timestamps(false, true);
    }),
  ])
);

exports.down = (knex) => {
  knex.schema.dropTable('realms');
};
