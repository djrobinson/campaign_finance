var knex = require('./knex');

module.exports = {
  getCmteCmteByDon: function(cmte_id, offset){
    return knex('cmte_to_cmte')
           .where({'CMTE_ID': cmte_id})
           .where('TRANSACTION_TP', 'LIKE', '24%')
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100)
           .offset(offset);
  },
  getCmteCmteByRec: function(cmte_id, offset){
    return knex('cmte_to_cmte')
           .where({'CMTE_ID': cmte_id})
           .where('TRANSACTION_TP', 'LIKE', '18%')
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100)
           .offset(offset);
  },
  getCmteCmteSort: function(offset){
    return knex('cmte_to_cmte')
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100)
           .offset(offset);
  }
}