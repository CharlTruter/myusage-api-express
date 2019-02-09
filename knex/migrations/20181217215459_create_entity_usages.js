exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('entity_usages', (table) => {
      table.bigincrements('id').primary();
      table.bigInteger('bytes_downloaded').notNullable();
      table.bigInteger('bytes_uploaded').notNullable();
      table.timestamp('usage_date').notNullable();
      table.bigInteger('realm_id').notNullable();
      table.bigInteger('entity_id').notNullable();
      table.string('user_id').notNullable();
      table.timestamps(false, true);
    }),
  ])
);

exports.down = (knex) => {
  knex.schema.dropTable('entity_usages');
};
