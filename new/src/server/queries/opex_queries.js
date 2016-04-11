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
  },
  getOpexByRec: function(name){
    return knex('opex')
           .where('NAME', 'like', '%'+ name +'%')
  },
  totalOpexByRec: function(){
    return knex('opex')
           .select('NAME')
           .sum('TRANSACTION_AMT')
           .groupBy('NAME')
           .orderBy('sum', 'desc')
           .limit(50);
  }
 }