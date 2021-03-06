
exports.up = function(knex, Promise) {
  return knex.schema.createTable('committee_summaries', function(table){
    table.string('com_nam');
    table.string('lin_ima');
    table.string('com_typ');
    table.string('com_des');
    table.string('fil_fre');
    table.text('add');
    table.text('cit');
    table.string('sta');
    table.string('zip');
    table.text('tre_nam');
    table.string('com_id');
    table.string('fec_ele_yea');
    table.decimal('ind_ite_con', 16);
    table.decimal('ind_uni_con', 16);
    table.decimal('ind_con', 16);
    table.decimal('ind_ref', 16);
    table.decimal('par_com_con', 16);
    table.decimal('oth_com_con', 16);
    table.decimal('oth_com_ref');
    table.decimal('can_con', 16);
    table.decimal('tot_con', 16);
    table.decimal('tot_con_ref', 16);
    table.decimal('can_loa', 16);
    table.decimal('can_loa_rep', 16);
    table.decimal('oth_loa', 16);
    table.decimal('oth_loa_rep', 16);
    table.decimal('tot_loa', 16);
    table.decimal('tot_loa_rep', 16);
    table.decimal('tra_fro_oth_aut_com', 16);
    table.decimal('tra_fro_non_fed_acc', 16);
    table.decimal('tra_fro_non_fed_lev_acc', 16);
    table.decimal('tot_non_fed_tra', 16);
    table.decimal('oth_rec', 16);
    table.decimal('tot_rec', 16);
    table.decimal('tot_fed_rec', 16);
    table.decimal('ope_exp', 16);
    table.decimal('sha_fed_ope_exp', 16);
    table.decimal('sha_non_fed_ope_exp', 16);
    table.decimal('tot_ope_exp', 16);
    table.decimal('off_to_ope_exp', 16);
    table.decimal('fed_sha_of_joi_act', 16);
    table.decimal('non_fed_sha_of_joi_act', 16);
    table.decimal('non_all_fed_ele_act_par', 16);
    table.decimal('tot_fed_ele_act', 16);
    table.decimal('fed_can_com_con', 16);
    table.decimal('fed_can_con_ref', 16);
    table.decimal('ind_exp_mad', 16);
    table.decimal('coo_exp_par', 16);
    table.decimal('loa_mad', 16);
    table.decimal('loa_rep_rec', 16);
    table.decimal('tra_to_oth_aut_com', 16);
    table.decimal('fun_dis', 16);
    table.decimal('off_to_fun_exp_pre', 16);
    table.decimal('exe_leg_acc_dis_pre', 16);
    table.decimal('off_to_leg_acc_exp_pre', 16);
    table.decimal('tot_off_to_ope_exp', 16);
    table.decimal('oth_dis', 16);
    table.decimal('tot_fed_dis', 16);
    table.decimal('tot_dis', 16);
    table.decimal('net_con', 16);
    table.decimal('net_ope_exp', 16);
    table.decimal('cas_on_han_beg_of_per', 16);
    table.decimal('cas_on_han_clo_of_per', 16);
    table.decimal('deb_owe_by_com', 16);
    table.decimal('deb_owe_to_com', 16);
    table.string('cov_sta_dat');
    table.string('cov_end_dat');
    table.decimal('pol_par_com_ref', 16);
    table.string('can_id');
    table.decimal('cas_on_han_beg_of_yea', 16);
    table.decimal('cas_on_han_clo_of_yea', 16);
    table.decimal('exp_sub_to_lim_pri_yea_pre', 16);
    table.decimal('exp_sub_lim', 16);
    table.decimal('fed_fun', 16);
    table.decimal('ite_con_exp_con_com', 16);
    table.decimal('ite_oth_dis', 16);
    table.decimal('ite_oth_inc', 16);
    table.decimal('ite_oth_ref_or_reb', 16);
    table.decimal('ite_ref_or_reb', 16);
    table.decimal('oth_fed_ope_exp', 16);
    table.decimal('sub_con_exp', 16);
    table.decimal('sub_oth_ref_or_reb', 16);
    table.decimal('sub_ref_or_reb', 16);
    table.decimal('tot_com_cos', 16);
    table.decimal('tot_exp_sub_to_lim_pre', 16);
    table.decimal('uni_con_exp', 16);
    table.decimal('uni_oth_dis', 16);
    table.decimal('uni_oth_inc', 16);
    table.decimal('uni_oth_ref_or_reb', 16);
    table.string('uni_ref_or_reb');
    table.string('org_tp');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('committee_summaries');
};
