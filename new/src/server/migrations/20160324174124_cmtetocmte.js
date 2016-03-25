
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cmte_to_cmte', function(table){
    table.string('CMTE_ID');
    table.string('AMNDT_IND');
    table.string('RPT_TP');
    table.string('TRANSACTION_PGI');
    table.string('IMAGE_NUM');
    table.string('TRANSACTION_TP');
    table.string('ENTITY_TP');
    table.string('NAME');
    table.string('CITY');
    table.string('STATE');
    table.string('ZIP_CODE');
    table.string('EMPLOYER');
    table.string('OCCUPATION');
    table.string('TRANSACTION_DT');
    table.string('TRANSACTION_AMT');
    table.string('OTHER_ID');
    table.string('TRAN_ID');
    table.string('FILE_NUM');
    table.string('MEMO_CD');
    table.string('MEMO_TEXT');
    table.string('SUB_ID');
  });
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('cmte_to_cmte');
};
