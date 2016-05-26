var knex = require('./knex');

module.exports = {
  getOpexSort: function(offset){
    return knex('opex')
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100)
           .offset(offset);
  },
  getOpexByCmte: function(cmte_id, offset){
    return knex('opex')
           .where({'CMTE_ID': cmte_id})
           .orderBy('TRANSACTION_AMT', 'desc')
           .offset(offset);
  },
  getOpexByRec: function(name, offset){
    return knex('opex')
           .where('NAME', 'like', '%'+ name +'%')
           .offset(offset);
  },
  totalOpexByRec: function(offset){
    return knex('opex')
           .select('NAME')
           .sum('TRANSACTION_AMT')
           .groupBy('NAME')
           .orderBy('sum', 'desc')
           .limit(50)
           .offset(offset);
  }
 }