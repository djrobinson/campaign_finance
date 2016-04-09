var knex = require('./knex');

module.exports = {
  getIndExpendByCand: function(cand_id){
    return knex('independent_expenditures')
           .where({'can_id': cand_id})
           .limit(100);
  },
  getIndExpendByComm: function(cmte_id){
    return knex('independent_expenditures')
           .where({'spe_id': cmte_id})
           .limit(100);
  }
}