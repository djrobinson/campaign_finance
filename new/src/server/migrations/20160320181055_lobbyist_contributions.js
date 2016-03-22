
exports.up = function(knex, Promise) {
  return knex.schema.createTable('lobbyist_contributions', function(table){
    table.string('com_id');
    table.string('com_nam');
    table.string('lin_ima');
    table.string('com_ele_sta');
    table.integer('com_ele_dis');
    table.string('rep_typ');
    table.date('rec_dat');
    table.date('cov_sta_dat');
    table.date('cov_end_dat');
    table.decimal('qua_con');
    table.decimal('sem_ann_con');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lobbyist_contributions');
};
