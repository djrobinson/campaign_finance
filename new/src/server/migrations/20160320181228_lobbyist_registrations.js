
exports.up = function(knex, Promise) {
  return knex.schema.createTable('lobbyist_registrations', function(table){
    table.string('com_id');
    table.string('com_nam');
    table.string('lin_ima');
    table.boolean('is_lob');
    table.date('dat_fil');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lobbyist_registrations');
};
