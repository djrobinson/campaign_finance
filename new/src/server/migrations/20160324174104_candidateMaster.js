
exports.up = function(knex, Promise) {
  return knex.schema.createTable('candidate_master', function(table){
    table.string('CAND_ID');
    table.string('CAND_NAME');
    table.string('CAND_PTY_AFFILIATION');
    table.string('CAND_ELECTION_YR');
    table.string('CAND_OFFICE_ST');
    table.string('CAND_OFFICE');
    table.string('CAND_OFFICE_DISTRICT');
    table.string('CAND_ICI');
    table.string('CAND_STATUS');
    table.string('CAND_PCC');
    table.string('CAND_ST1');
    table.string('CAND_ST2');
    table.string('CAND_CITY');
    table.string('CAND_ST');
    table.string('CAND_ZIP');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('candidate_master');
};
