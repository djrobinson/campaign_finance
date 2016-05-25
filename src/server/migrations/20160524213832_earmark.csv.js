
exports.up = function(knex, Promise) {
  return knex.schema.createTable('earmark', function(table){
    table.string("id");
    table.string("import_reference_id");
    table.integer("fiscal_year");
    table.string("budget_amount");
    table.string("house_amount");
    table.string("senate_amount");
    table.decimal("omni_amount");
    table.decimal("final_amount");
    table.string("bill");
    table.string("bill_section");
    table.string("bill_subsection");
    table.string("description");
    table.string("notes");
    table.string("presidential");
    table.string("undisclosed");
    table.string("house_members");
    table.string("house_parties");
    table.string("house_districts");
    table.string("senate_members");
    table.string("house_states");
    table.string("senate_parties");
    table.string("senate_states");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('earmark');
};
