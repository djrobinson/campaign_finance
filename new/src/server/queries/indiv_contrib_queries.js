var knex = require('./knex');

module.exports = {
  getIndivContrib: function(cmte_id){
    return knex('indiv_contrib')
           .where({'CMTE_ID': cmte_id})
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100);
  },
  getIndivContribs: function(){
    return knex('indiv_contrib')
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100);
  },
  getContribByDon: function(donor){
    return knex('indiv_contrib')
           .where('NAME', 'like', '%'+donor+'%');
  },
  aggregateEmpl: function(donor){
    return knex('indiv_contrib')
           .select('EMPLOYER')
           .sum('TRANSACTION_AMT')
           .groupBy('EMPLOYER')
           .orderBy('sum', 'desc')
           .limit(100);
  },
  aggregateTitle: function(donor){
    return knex('indiv_contrib')
           .select('OCCUPATION')
           .sum('TRANSACTION_AMT')
           .groupBy('OCCUPATION')
           .orderBy('sum', 'desc')
           .limit(100);
  },
  singleEmpl: function(employ){
    return knex('indiv_contrib')
           .where({'EMPLOYER': employ})
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100);
  },
  indivByCmte: function(cmte_id){
    return knex('indiv_contrib')
           .where({'CMTE_ID': cmte_id})
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100);
  }
}