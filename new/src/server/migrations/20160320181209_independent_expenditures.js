
exports.up = function(knex, Promise) {
  return knex.schema.createTable('independent_expenditures', function(table){
    table.string('can_id');
    table.string('can_nam');
    table.string('spe_id');
    table.string('spe_nam');
    table.string('ele_typ');
    table.string('can_off_sta');
    table.integer('can_off_dis');
    table.string('can_off');
    table.string('can_par_aff');
    table.decimal('exp_amo');
    table.date('exp_dat');
    table.decimal('agg_amo');
    table.string('sup_opp');
    table.string('pur');
    table.string('pay');
    table.integer('file_num');
    table.string('amn_ind');
    table.string('tra_id');
    table.integer('ima_num');
    table.date('rec_dt');
    table.integer('prev_file_num');
    table.date('dissem_dt');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('independent_expenditures');
};
