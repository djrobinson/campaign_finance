var knex = require('./knex');

module.exports = {
  getExpSort: function(offset){
    return knex('independent_expenditures')
           .orderBy('exp_amo', 'desc')
           .limit(100)
           .offset(offset);
  },
  getIndExpendByCand: function(cand_id, offset){
    return knex('independent_expenditures')
           .where({'can_id': cand_id})
           .orderBy('exp_amo', 'desc')
           .limit(100)
           .offset(offset);
  },
  getAllIndExpendByCand: function(cand_id, offset){
    return knex('independent_expenditures')
           .where({'can_id': cand_id})
           .orderBy('exp_amo', 'desc')
           .offset(offset);
  },
  getIndExpendByComm: function(cmte_id, offset){
    return knex('independent_expenditures')
           .where({'spe_id': cmte_id})
           .orderBy('exp_amo', 'desc')
           .limit(100)
           .offset(offset);
  },
  getSuppByCand: function(cand_id, offset){
    return knex('independent_expenditures')
           .where({'can_id': cand_id, 'sup_opp': 'Support'})
           .limit(100)
           .offset(offset);
  },
  getOppByCand: function(cand_id, offset){
    return knex('independent_expenditures')
           .where({'can_id': cand_id, 'sup_opp': 'Oppose'})
           .limit(100)
           .offset(offset);
  },
  getSuppByCmte: function(cmte_id, offset){
    return knex('independent_expenditures')
           .where({'spe_id': cmte_id, 'sup_opp': 'Support'})
           .limit(100)
           .offset(offset);
  },
  getOppByCmte: function(cmte_id, offset){
    return knex('independent_expenditures')
           .where({'spe_id': cmte_id, 'sup_opp': 'Oppose'})
           .limit(100)
           .offset(offset);
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
  }
}