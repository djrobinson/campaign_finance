var knex = require('./knex');

function CmteToCand(){
  return knex('cmte_to_cand');
}

module.exports = {
  getTenCmteToCand: function(){
    return CmteToCand().select().limit(10);
  },
  getCmteToCand: function(can_id){
    return CmteToCand().select().where({CAND_ID: can_id});
  }
}
