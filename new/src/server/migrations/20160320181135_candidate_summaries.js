
exports.up = function(knex, Promise) {
  return knex.schema.createTable('candidate_summaries', function(table){
    table.string('lin_ima');
    table.string('can_id');
    table.string('can_nam');
    table.text('can_off');
    table.string('can_off_sta');
    table.string('can_off_dis');
    table.string('can_par_aff');
    table.string('can_inc_cha_ope_sea');
    table.text('can_str1');
    table.text('can_str2');
    table.text('can_cit');
    table.text('can_sta');
    table.string('can_zip');
    table.string('ind_ite_con');
    table.string('ind_uni_con');
    table.string('ind_con');
    table.string('par_com_con');
    table.string('oth_com_con');
    table.string('can_con');
    table.string('tot_con');
    table.string('tra_fro_oth_aut_com');
    table.string('can_loa');
    table.string('oth_loa');
    table.string('tot_loa');
    table.string('off_to_ope_exp');
    table.string('off_to_fun');
    table.string('off_to_leg_acc');
    table.string('oth_rec');
    table.string('tot_rec');
    table.string('ope_exp');
    table.string('exe_leg_acc_dis');
    table.string('fun_dis');
    table.string('tra_to_oth_aut_com');
    table.string('can_loa_rep');
    table.string('oth_loa_rep');
    table.string('tot_loa_rep');
    table.string('ind_ref');
    table.string('par_com_ref');
    table.string('oth_com_ref');
    table.string('tot_con_ref');
    table.string('oth_dis');
    table.string('tot_dis');
    table.string('cas_on_han_beg_of_per');
    table.string('cas_on_han_clo_of_per');
    table.string('net_con');
    table.string('net_ope_exp');
    table.string('deb_owe_by_com');
    table.string('deb_owe_to_com');
    table.string('cov_sta_dat');
    table.string('cov_end_dat');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('candidate_summaries');
};
