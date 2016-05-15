
exports.up = function(knex, Promise) {
  return knex.schema.createTable('candidacy_statements', function(table){
    table.string('CANDIDATE_ID');
    table.string('CANDIDATE_NAME');
    table.string('PARTY');
    table.string('PARTY_CODE');
    table.string('CANDIDATE_OFFICE');
    table.string('CANDIDATE_OFFICE_CODE');
    table.string('CANDIDATE_OFFICE_STATE');
    table.string('CANDIDATE_OFFICE_STATE_CODE');
    table.string('CANDIDATE_OFFICE_DISTRICT');
    table.string('CITY');
    table.string('STATE');
    table.string('ZIP');
    table.string('ELECTION_YEAR');
    table.date('RECEIPT_DATE');
    table.string('REPORT_YEAR');
    table.string('BEGIN_IMAGE_NUMBER');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('candidacy_statements');
};
