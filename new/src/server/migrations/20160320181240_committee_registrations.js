
exports.up = function(knex, Promise) {
  return knex.schema.createTable('committee_registrations', function(table){
    table.string('COMMITTEE_NAME');
    table.string('COMMITTEE_ID');
    table.text('COMMITTEE_STREET_1');
    table.text('COMMITTEE_STREET_2');
    table.string('COMMITTEE_CITY');
    table.string('COMMITTEE_STATE');
    table.string('COMMITTEE_ZIP');
    table.text('AFFILIATED_COMMITTEE_NAME');
    table.string('FILED_COMMITTEE_TYPE');
    table.string('FILED_COMMITTEE_DESIGNATION');
    table.string('FILING_FREQUENCY');
    table.string('ORGANIZATION_TYPE');
    table.string('TREASURER_NAME');
    table.date('RECEIPT_DATE');
    table.string('COMMITTEE_EMAIL');
    table.string('COMMITTEE_WEB_URL');
    table.string('BEGIN_IMAGE_NUMBER');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('committee_registrations');
};
