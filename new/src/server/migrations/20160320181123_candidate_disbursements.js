
exports.up = function(knex, Promise) {
  return knex.schema.createTable('candidate_disbursements', function(table){
    table.string('com_id');
    table.string('com_nam');
    table.string('can_id');
    table.string('can_nam');
    table.string('ele_yea');
    table.string('can_off');
    table.string('can_off_sta');
    table.string('can_off_dis');
    table.string('lin_num');
    table.string('lin_ima');
    table.string('rec_com_id');
    table.string('rec_nam');
    table.string('rec_str1');
    table.string('rec_str2');
    table.string('rec_cit');
    table.string('rec_sta');
    table.string('rec_zip');
    table.string('dis_dat');
    table.string('dis_amo');
    table.string('dis_pur_des');
    table.string('mem_cod');
    table.string('mem_tex');
    table.string('cat_cod');
    table.string('cat_des');
    table.string('tra_id');
    table.string('bac_ref_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('candidate_disbursements');
};
