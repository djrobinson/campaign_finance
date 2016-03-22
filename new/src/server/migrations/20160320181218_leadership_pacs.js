
exports.up = function(knex, Promise) {
  return knex.schema.createTable('leadership_pacs', function(data){
    table.string('com_id');
    table.string('com_nam');
    table.string('lin_ima');
    table.text('spo_nam');
    table.text('aff_com_nam');
    table.decimal('tot_rec');
    table.decimal('tot_dis');
    table.decimal('cas_on_han');
    table.date('cov_end_dat');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('leadership_pacs');
};
