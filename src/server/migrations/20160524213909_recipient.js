
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipient', function(table){
    table.string("id");
    table.string("earmark_id");
    table.string("raw_recipient");
    table.string("standardized_recipient");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipient');
};
