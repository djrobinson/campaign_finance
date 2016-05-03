var knex = require('./knex');

module.exports = {
  getDisbursements: function(cand_id, offset){
    return knex('candidate_disbursements')
          .where({'can_id': cand_id})
          .limit(100)
          .offset(offset);
  },
  getIndExpendByCand: function(cand_id){
    return knex('independent_expenditures')
           .where({'can_id': cand_id})
           .limit(100);
  },
  getIndExpendByComm: function(cmte_id){
    return knex('independent_expenditures')
           .where({'spe_id': cmte_id})
           .limit(100);
  },
  getCmteCandByCand: function(cand_id){
    return knex('cmte_to_cand')
           .where({'CAND_ID': cand_id})
           .limit(100);
  },
  getCmteCandByCmte: function(cmte_id){
    return knex('cmte_to_cand')
           .where({'CMTE_ID': cmte_id})
           .limit(100);
  },
  getCmteCmteByDon: function(cmte_id){
    return knex('cmte_to_cmte')
           .where({'CMTE_ID': cmte_id})
           .limit(100);
  },
  getCmteCmteByRec: function(cmte_id){
    return knex('cmte_to_cmte')
           .where({'OTHER_ID': cmte_id})
           .limit(100);
  },
  getIndivContrib: function(cmte_id){
    return knex('indiv_contrib')
           .where({'cmte_id': cmte_id})
           .limit(100);
  }
};