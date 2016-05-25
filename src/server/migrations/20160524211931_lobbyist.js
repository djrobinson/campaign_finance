
exports.up = function(knex, Promise) {
  return knex.schema.createTable('lobbyist', function(table){
    table.string("id");
    table.string("year");
    table.string("transaction_id");
    table.string("lobbyist_name");
    table.string("lobbyist_ext_id");
    table.string("candidate_ext_id");
    table.string("government_position");
    table.string("member_of_congress");
  });
};

exports.down = function(knex, Promise) {
  return knex.dropTable('lobbyist');
};
