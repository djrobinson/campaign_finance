
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
    table.decimal('ind_ite_con', 12);
    table.decimal('ind_uni_con', 12);
    table.decimal('ind_con', 12);
    table.decimal('par_com_con', 12);
    table.decimal('oth_com_con', 12);
    table.decimal('can_con', 12);
    table.decimal('tot_con', 12);
    table.decimal('tra_fro_oth_aut_com', 12);
    table.decimal('can_loa', 12);
    table.decimal('oth_loa', 12);
    table.decimal('tot_loa', 12);
    table.decimal('off_to_ope_exp', 12);
    table.decimal('off_to_fun', 12);
    table.decimal('off_to_leg_acc', 12);
    table.decimal('oth_rec', 12);
    table.decimal('tot_rec', 12);
    table.decimal('ope_exp', 12);
    table.decimal('exe_leg_acc_dis', 12);
    table.decimal('fun_dis', 12);
    table.decimal('tra_to_oth_aut_com', 12);
    table.decimal('can_loa_rep', 12);
    table.decimal('oth_loa_rep', 12);
    table.decimal('tot_loa_rep', 12);
    table.decimal('ind_ref', 12);
    table.decimal('par_com_ref', 12);
    table.decimal('oth_com_ref', 12);
    table.decimal('tot_con_ref', 12);
    table.decimal('oth_dis', 12);
    table.decimal('tot_dis', 12);
    table.decimal('cas_on_han_beg_of_per', 12);
    table.decimal('cas_on_han_clo_of_per', 12);
    table.decimal('net_con', 12);
    table.decimal('net_ope_exp', 12);
    table.decimal('deb_owe_by_com', 12);
    table.decimal('deb_owe_to_com'), 12;
    table.string('cov_sta_dat');
    table.string('cov_end_dat');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('candidate_summaries');
};
