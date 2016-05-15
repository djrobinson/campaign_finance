
exports.up = function(knex, Promise) {
  return knex.schema.createTable('leadership_pacs', function(table){
    table.string('com_id');
    table.string('com_nam');
    table.string('lin_ima');
    table.text('spo_nam');
    table.text('aff_com_nam');
    table.string('tot_rec');
    table.string('tot_dis');
    table.string('cas_on_han');
    table.string('cov_end_dat');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('leadership_pacs');
};
