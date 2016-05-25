
exports.up = function(knex, Promise) {
  return knex.schema.createTable('lobbying', function(table){
    table.string("transaction_id");
    table.string("transaction_type");
    table.string("transaction_type_desc");
    table.string("year");
    table.string("filing_type");
    table.string("filing_included_nsfs");
    table.string("amount");
    table.string("registrant_name");
    table.string("registrant_is_firm");
    table.string("client_name");
    table.string("client_category");
    table.string("client_parent_name");
    table.string("include_in_industry_totals");
    table.string("use");
    table.string("affiliate");
  });
};

exports.down = function(knex, Promise) {
  return knex.dropTable('lobbying');
};
