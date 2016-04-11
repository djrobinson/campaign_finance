var knex = require('./knex');

module.exports = {
  getOpexSort: function(){
    return knex('opex')
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100);
  },
  getOpexByCmte: function(cmte_id){
    return knex('opex')
           .where({'CMTE_ID': cmte_id})
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100);
  }
}