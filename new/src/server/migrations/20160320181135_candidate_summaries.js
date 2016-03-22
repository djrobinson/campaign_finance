
exports.up = function(knex, Promise) {
  return knex.schema.createTable('candidate_summaries', function(table){
    table.string('lin_ima');
    table.string('can_id');
    table.string('can_nam');
    table.text('can_off');
    table.string('can_off_sta');
    table.integer('can_off_dis');
    table.string('can_par_aff');
    table.string('can_inc_cha_ope_sea');
    table.text('can_str1');
    table.text('can_str2');
    table.text('can_cit');
    table.text('can_sta');
    table.integer('can_zip');
    table.decimal('ind_ite_con');
    table.decimal('ind_uni_con');
    table.decimal('ind_con');
    table.decimal('par_com_con');
    table.decimal('oth_com_con');
    table.decimal('can_con');
    table.decimal('tot_con');
    table.decimal('tra_fro_oth_aut_com');
    table.decimal('can_loa');
    table.decimal('oth_loa');
    table.decimal('tot_loa');
    table.decimal('off_to_ope_exp');
    table.decimal('off_to_fun');
    table.decimal('off_to_leg_acc');
    table.decimal('oth_rec');
    table.decimal('tot_rec');
    table.decimal('ope_exp');
    table.decimal('exe_leg_acc_dis');
    table.decimal('fun_dis');
    table.decimal('tra_to_oth_aut_com');
    table.decimal('can_loa_rep');
    table.decimal('oth_loa_rep');
    table.decimal('tot_loa_rep');
    table.decimal('ind_ref');
    table.decimal('par_com_ref');
    table.decimal('oth_com_ref');
    table.decimal('tot_con_ref');
    table.decimal('oth_dis');
    table.decimal('tot_dis');
    table.decimal('cas_on_han_beg_of_per');
    table.decimal('cas_on_han_clo_of_per');
    table.decimal('net_con');
    table.decimal('net_ope_exp');
    table.decimal('deb_owe_by_com');
    table.decimal('deb_owe_to_com');
    table.string('cov_sta_dat');
    table.string('cov_end_dat');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('candidate_summaries');
};
