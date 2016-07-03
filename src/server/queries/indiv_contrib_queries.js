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
  bubbleContrib: function(cmte_id){
    return knex('indiv_contrib')
            .select('TRANSACTION_AMT', 'NAME', 'TRAN_ID')
            .where({'CMTE_ID': cmte_id})
            .orderBy('TRANSACTION_AMT', 'desc')
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
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100);
  },
  indivByCmteChart: function(cmte_id){
    return knex('indiv_contrib')
           .select('NAME', 'TRANSACTION_DT', 'TRANSACTION_AMT')
           .where({'CMTE_ID': cmte_id});
  },
  indivByCmtePie: function(cmte_id){
    return knex('indiv_contrib')
            .raw(`select sum(case when TRANSACTION_AMT < 200 then 1 else 0 end) as [less than 200],
                sum(case when value >= 200 and value <= 1499 then 1 else 0 end) as [200 to 1499],
                sum(case when value >= 200 and value <= 1499 then 1 else 0 end) as [200 to 1499],
                sum(case when value > 1499 then 1 else 0 end) as [above 1499]
                from indiv_contrib
                where "CMTE_ID" = 'C00575795'`)
  }
  /*
  select sum(case when "TRANSACTION_AMT" < 200 then 1 else 0 end) as "less than 200",
                sum(case when "TRANSACTION_AMT" >= 200 and "TRANSACTION_AMT" <= 1499 then 1 else 0 end) as "200 to 1499",
                sum(case when "TRANSACTION_AMT" >= 200 and "TRANSACTION_AMT" <= 1499 then 1 else 0 end) as "200 to 1499",
                sum(case when "TRANSACTION_AMT" > 1499 then 1 else 0 end) as "above 1499"
                from indiv_contrib
                where "CMTE_ID" = 'C00575795';

  */
}