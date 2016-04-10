
exports.up = function(knex, Promise) {
  return knex.schema.createTable('administrative_fines', function(table){
    table.integer('cas_num');
    table.string('com_id');
    table.string('com_nam');
    table.string('rep_typ');
    table.integer('rep_yea');
    table.decimal('fin_amo').defaultTo(0);
    table.string('off');
    table.string('sta');
    table.string('dis');
    table.string('can_nam');
    table.string('lat_fil_not_fil');
    table.string('pai_yes_no');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('administrative_fines');
};
