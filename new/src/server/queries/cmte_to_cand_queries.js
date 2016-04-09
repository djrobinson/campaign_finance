var knex = require('./knex');

module.exports = {
  getCmteCandByCand: function(cand_id){
    return knex('cmte_to_cand')
           .where({'CAND_ID': cand_id})
           .limit(100);
  },
  getCmteCandByCmte: function(cmte_id){
    return knex('cmte_to_cand')
           .where({'CMTE_ID': cmte_id})
           .limit(100);
  }
}