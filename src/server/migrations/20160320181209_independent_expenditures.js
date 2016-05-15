
exports.up = function(knex, Promise) {
  return knex.schema.createTable('independent_expenditures', function(table){
    table.string('can_id');
    table.string('can_nam');
    table.string('spe_id');
    table.string('spe_nam');
    table.string('ele_typ');
    table.string('can_off_sta');
    table.string('can_off_dis');
    table.string('can_off');
    table.string('can_par_aff');
    table.decimal('exp_amo', 12);
    table.string('exp_dat');
    table.decimal('agg_amo', 12);
    table.string('sup_opp');
    table.string('pur');
    table.string('pay');
    table.string('file_num');
    table.string('amn_ind');
    table.string('tra_id');
    table.string('ima_num');
    table.string('rec_dat');
    table.string('prev_file_num');
    table.string('dissem_dt');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('independent_expenditures');
};
