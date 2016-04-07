var knex = require('./knex');

function CmteCandLink(){
  return knex('cmte_cand_linkage');
}

module.exports = {
  getTenCmteCandLink: function(){
    return CmteCandLink().select().limit(10);
  },
  getCmteCandLink: function(cand_id){
    return CmteCandLink().select().where({CAND_ID: cand_id});
  }
};