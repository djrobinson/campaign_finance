
exports.up = function(knex, Promise) {
  return knex.schema.createTable('administrative_fines', function(table){
    table.integer('cas_num');
    table.string('com_id');
    table.string('com_nam');
    table.string('rep_typ');
    table.integer('rep_yea');
    table.decimal('fin_amo');
    table.string('off');
    table.string('sta');
    table.string('dis');
    table.string('can_name');
    table.boolean('lat_fil_not_fil');
    table.boolean('pai_yes_no');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('administrative_fines');
};
