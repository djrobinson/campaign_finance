
exports.up = function(knex, Promise) {
  return knex.schema.createTable('lobby_agency', function(table){
    table.string("id");
    table.string("transaction_id");
    table.string("agency_name");
    table.string("agency_ext_id");
  });
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lobby_agency');
};
