
exports.up = function(knex, Promise) {
  return knex.schema.createTable('lobby_issue', function(table){
    table.string("id");
    table.integer("year");
    table.string("transaction_id");
    table.string("general_issue_code");
    table.string("general_issue");
    table.text("specific_issue");
  });
};

// id,year,transaction_id,general_issue_code,general_issue,specific_issue

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lobby_issue');
};
