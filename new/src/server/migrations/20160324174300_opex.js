
exports.up = function(knex, Promise) {
  return knex.schema.createTable('opex', function(table){
    table.string('CMTE_ID');
    table.string('AMNDT_IND');
    table.string('RPT_YR');
    table.string('RPT_TP');
    table.string('IMAGE_NUM');
    table.string('LINE_NUM');
    table.string('FORM_TP_CD');
    table.string('SCHED_TP_CD');
    table.string('NAME');
    table.string('CITY');
    table.string('STATE');
    table.string('ZIP_CODE');
    table.string('TRANSACTION_DT');
    table.string('TRANSACTION_AMT');
    table.string('TRANSACTION_PGI');
    table.string('PURPOSE');
    table.string('CATEGORY');
    table.string('CATEGORY_DESC');
    table.string('MEMO_CD');
    table.string('MEMO_TEXT');
    table.string('ENTITY_TP');
    table.string('SUB_ID');
    table.string('FILE_NUM');
    table.string('TRAN_ID');
    table.string('BACK_REF_TRAN_ID');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('opex');
};
