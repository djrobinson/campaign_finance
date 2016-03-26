
exports.up = function(knex, Promise) {
  return knex.schema.createTable('committee_master', function(table){
    table.string('CMTE_ID');
    table.string('CMTE_NM');
    table.string('TRES_NM');
    table.string('CMTE_ST1');
    table.string('CMTE_ST2');
    table.string('CMTE_CITY');
    table.string('CMTE_ST');
    table.string('CMTE_ZIP');
    table.string('CMTE_DSGN');
    table.string('CMTE_TP');
    table.string('CMTE_PTY_AFFILIATION');
    table.string('CMTE_FILING_FREQ');
    table.string('ORG_TP');
    table.string('CONNECTED_ORG_NM');
    table.string('CAND_ID');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('committee_master');
};
