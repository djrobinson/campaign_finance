
exports.up = function(knex, Promise) {
  return knex.schema.createTable('location', function(table){
    table.string("id");
    table.string("earmark_id");
    table.string("city");
    table.string("state");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('location');
};
