
exports.up = function(knex, Promise) {
  return knex.schema.createTable('lobby_bill', function(table){
    table.string("id");
    table.string("bill_id");
    table.string("issue_id");
    table.string("congress_no");
    table.string("bill_type_raw");
    table.string("bill_type");
    table.string("bill_no");
    table.string("bill_name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lobby_bill');
};
