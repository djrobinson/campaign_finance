
exports.up = function(knex, Promise) {
  return knex.schema.createTable('elec_communications', function(){
    table.string('CANDIDATE_ID');
    table.string('CANDIDATE_NAME');
    table.string('CANDIDATE_OFFICE');
    table.string('CANDIDATE_STATE');
    table.string('CANDIDATE_OFFICE_DISTRICT');
    table.string('COMMITTEE_ID');
    table.string('COMMITTEE_NAME');
    table.integer('SB_IMAGE_NUM');
    table.string('PAYEE_NAME');
    table.string('PAYEE_STREET');
    table.string('PAYEE_CITY');
    table.string('PAYEE_STATE');
    table.string('DISBURSEMENT_DESCRIPTION');
    table.date('DISBURSEMENT_DATE');
    table.date('COMMUNICATION_DATE');
    table.date('PUBLIC_DISTRIBUTION_DATE');
    table.integer('REPORTED_DISBURSEMENT_AMOUNT');
    table.integer('NUMBER_OF_CANDIDATES');
    table.integer('CALCULATED_CANDIDATE_SHARE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('elec_communications');
};
