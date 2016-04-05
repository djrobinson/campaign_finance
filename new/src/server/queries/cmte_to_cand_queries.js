var knex = require('./knex');

function CmteToCand(){
  return knex('cmte_to_cand');
}

module.exports = {
  getTenCmteToCand: function(){
    return CmteToCand().select().limit(10);
  },
  getCmteToCand: function(can_id){
    return CamCmteRpt().select().where({cand_id: can_id});
  }
}
