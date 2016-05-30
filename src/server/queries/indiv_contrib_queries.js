var knex = require('./knex');

module.exports = {
  getIndivContrib: function(cmte_id, offset){
    return knex('indiv_contrib')
           .where({'CMTE_ID': cmte_id})
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100)
           .offset(offset);
  },
  getIndivContribs: function(offset){
    return knex('indiv_contrib')
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100)
           .offset(offset);
  },
  getContribByDon: function(donor, offset){
    return knex('indiv_contrib')
           .where('NAME', 'like', '%'+donor+'%')
           .offset(offset);
  },
  getContribById: function(tran_id){
    return knex('indiv_contrib')
            .where('TRAN_ID', tran_id);
  },
  aggregateEmpl: function(donor, offset){
    return knex('indiv_contrib')
           .select('EMPLOYER')
           .sum('TRANSACTION_AMT')
           .groupBy('EMPLOYER')
           .orderBy('sum', 'desc')
           .limit(100)
           .offset(offset);
  },
  aggregateTitle: function(offset){
    return knex('indiv_contrib')
           .select('OCCUPATION')
           .sum('TRANSACTION_AMT')
           .groupBy('OCCUPATION')
           .orderBy('sum', 'desc')
           .limit(100)
           .offset(offset);
  },
  singleEmpl: function(employ, offset){
    return knex('indiv_contrib')
           .where({'EMPLOYER': employ})
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100)
           .offset(offset);
  },
  indivByCmteLimit: function(cmte_id, offset){
    return knex('indiv_contrib')
           .where({'CMTE_ID': cmte_id})
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100)
           .offset(offset);
  },
  indivByCmte: function(cmte_id, offset){
    return knex('indiv_contrib')
           .where({'CMTE_ID': cmte_id})
           .orderBy('TRANSACTION_AMT', 'desc');
  }
}