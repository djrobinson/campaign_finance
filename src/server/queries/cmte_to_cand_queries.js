var knex = require('./knex');

module.exports = {
  getCmteCandByCand: function(cand_id, offset){
    return knex('cmte_to_cand')
           .innerJoin('committee_summaries', 'cmte_to_cand.CMTE_ID', 'committee_summaries.com_id')
           .where({'CAND_ID': cand_id})
           .select('cmte_to_cand.CAND_ID', 'cmte_to_cand.CMTE_ID', 'committee_summaries.com_nam', 'committee_summaries.cas_on_han_clo_of_per', 'committee_summaries.net_con', 'committee_summaries.tot_dis')
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100)
           .offset(offset);
  },
  getCmteCandByCmte: function(cmte_id, offset){
    return knex('cmte_to_cand')
           .where({'CMTE_ID': cmte_id})
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100)
           .offset(offset);
  },
  getCmteCandSort: function(offset){
    return knex('cmte_to_cand')
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100)
           .offset(offset);
  }
}