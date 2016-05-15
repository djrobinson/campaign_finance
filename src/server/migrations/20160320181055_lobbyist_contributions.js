
exports.up = function(knex, Promise) {
  return knex.schema.createTable('lobbyist_contributions', function(table){
    table.string('com_id');
    table.string('com_nam');
    table.string('lin_ima');
    table.string('com_ele_sta');
    table.string('com_ele_dis');
    table.string('rep_typ');
    table.string('rec_dat');
    table.string('cov_sta_dat');
    table.string('cov_end_dat');
    table.string('qua_con');
    table.string('sem_ann_con');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lobbyist_contributions');
};
