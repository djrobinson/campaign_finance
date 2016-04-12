var knex = require('./knex');

module.exports = {
  getExpSort: function(){
    return knex('independent_expenditures')
           .orderBy('agg_amo', 'desc')
           .limit(100);
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
  getSuppByCmte: function(cmte_id){
    return knex('independent_expenditures')
           .where({'spe_id': cmte_id, 'sup_opp': 'Support'})
           .limit(100);
  },
  getOppByCmte: function(cmte_id){
    return knex('independent_expenditures')
           .where({'spe_id': cmte_id, 'sup_opp': 'Oppose'})
           .limit(100);
  },
  groupedCat: function(){
    return knex('independent_expenditures')
           .select('pur')
           .sum('exp_amo')
           .groupBy('pur')
           .orderBy('sum', 'desc');
  },
  candExpByCat: function(cand_id){
    return knex('independent_expenditures')
           .where({'can_id': cand_id})
           .select('pur')
           .sum('exp_amo')
           .groupBy('pur')
           .orderBy('sum', 'desc');
  },

}