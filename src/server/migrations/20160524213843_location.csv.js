
exports.up = function(knex, Promise) {
  return knex.schema.createTable('location', function(table){
    table.string("id");
    table.string("earmark_id");
    table.number("city");
    table.string("state");
  });
};

exports.down = function(knex, Promise) {
  return knex.dropTable('location');
};
