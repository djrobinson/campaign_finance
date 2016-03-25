
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cmte_cand_linkage', function(table){
    table.string('CAND_ID');
    table.string('CAND_ELECTION_YR');
    table.string('FEC_ELECTION_YR');
    table.string('CMTE_ID');
    table.string('CMTE_TP');
    table.string('CMTE_DSGN');
    table.string('LINKAGE_ID');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cmte_cand_linkage');
};
