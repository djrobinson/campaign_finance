
exports.up = function(knex, Promise) {
  return knex.schema.createTable('member', function(table){
    table.string("id");
    table.string("earmark_id");
    table.number("raw_name");
    table.string("crp_id");
    table.string("crstandardized_namep_id");
    table.string("chamber");
    table.string("party");
    table.string("state");
    table.string("district");
  });
};

exports.down = function(knex, Promise) {
  return knex.dropTable('member');
};
