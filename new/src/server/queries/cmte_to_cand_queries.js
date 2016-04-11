var knex = require('./knex');

module.exports = {
  getCmteCandByCand: function(cand_id){
    return knex('cmte_to_cand')
           .where({'CAND_ID': cand_id})
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100);
  },
  getCmteCandByCmte: function(cmte_id){
    return knex('cmte_to_cand')
           .where({'CMTE_ID': cmte_id})
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100);
  },
  getCmteCandSort: function(){
    return knex('cmte_to_cand')
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100);
  }
}