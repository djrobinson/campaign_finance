
exports.up = function(knex, Promise) {
  return knex.schema.createTable('earmark', function(table){
    table.string("id");
    table.string("import_reference_id");
    table.integer("fiscal_year");
    table.string("budget_amount");
    table.string("house_amount");
    table.string("senate_amount");
    table.decimal("omni_amount", 12);
    table.decimal("final_amount", 12);
    table.string("bill");
    table.string("bill_section");
    table.string("bill_subsection");
    table.text("description");
    table.string("notes");
    table.string("presidential");
    table.string("undisclosed");
    table.text("house_members");
    table.text("house_parties");
    table.text("house_districts");
    table.text("senate_members");
    table.text("house_states");
    table.text("senate_parties");
    table.text("senate_states");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('earmark');
};
