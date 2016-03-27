
exports.up = function(knex, Promise) {
  return knex.schema.createTable('elec_communications', function(table){
    table.string('CANDIDATE_ID');
    table.string('CANDIDATE_NAME');
    table.string('CANDIDATE_OFFICE');
    table.string('CANDIDATE_STATE');
    table.string('CANDIDATE_DISTRICT');
    table.string('COMMITTEE_ID');
    table.string('COMMITTEE_NAME');
    table.string('SB_IMAGE_NUM');
    table.string('PAYEE_NAME');
    table.string('PAYEE_STREET');
    table.string('PAYEE_CITY');
    table.string('PAYEE_STATE');
    table.string('DISBURSEMENT_DESCRIPTION');
    table.string('DISBURSEMENT_DATE');
    table.string('PUBLIC_DISBURSEMENT_DATE');
    table.string('COMMUNICATION_DATE');
    table.string('PUBLIC_DISTRIBUTION_DATE');
    table.string('REPORTED_DISBURSEMENT_AMOUNT');
    table.string('NUMBER_OF_CANDIDATES');
    table.string('CALCULATED_CANDIDATE_SHARE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('elec_communications');
};
