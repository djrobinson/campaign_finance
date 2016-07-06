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
  allEmployers: function(cmte_id){
    return knex.raw(`
              SELECT SUM("TRANSACTION_AMT"), "EMPLOYER"
                FROM indiv_contrib
                WHERE "CMTE_ID" = '`+cmte_id+`'
                GROUP BY "EMPLOYER"
                ORDER BY sum DESC
                LIMIT 100;
                    `)
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
    return knex.raw(`
            select sum(case when "TRANSACTION_AMT" < 200 then "TRANSACTION_AMT" else 0 end) as "less than 200",
              sum(case when "TRANSACTION_AMT" >= 200 and "TRANSACTION_AMT" <= 1499 then "TRANSACTION_AMT" else 0 end) as "200 to 1499",
              sum(case when "TRANSACTION_AMT" > 1499 and "TRANSACTION_AMT" <= 2699 then "TRANSACTION_AMT" else 0 end) as "1500 to 2699",
              sum(case when "TRANSACTION_AMT" > 2699 then "TRANSACTION_AMT" else 0 end) as "Max Donation",
              count("TRANSACTION_AMT")
              from indiv_contrib
              where "CMTE_ID" = '`+cmte_id+`';`);
  },
  indivByDate: function(cmte_id){
    return knex.raw(`
                    select count(*),date_trunc( 'month', "TRANSACTION_DT" ) from indiv_contrib
                      WHERE "CMTE_ID" = '`+cmte_id+`'
                      group by
                      date_trunc( 'month', "TRANSACTION_DT" );
                    `);
  }
  /*\
    EXPLAIN ANALYZE
    //This is for count
    select sum(case when "TRANSACTION_AMT" < 200 then 1 else 0 end) as "less than 200",
              sum(case when "TRANSACTION_AMT" >= 200 and "TRANSACTION_AMT" <= 1499 then 1 else 0 end) as "200 to 1499",
              sum(case when "TRANSACTION_AMT" > 1499 and "TRANSACTION_AMT" <= 2699 then 1 else 0 end) as "1500 to 2699",
              sum(case when "TRANSACTION_AMT" > 2699 then 1 else 0 end) as "2700 and above"
              from indiv_contrib
              WHERE "CMTE_ID" = 'C00575795';
    //This is for amount donated
    select sum(case when "TRANSACTION_AMT" < 200 then "TRANSACTION_AMT" else 0 end) as "less than 200",
              sum(case when "TRANSACTION_AMT" >= 200 and "TRANSACTION_AMT" <= 1499 then "TRANSACTION_AMT" else 0 end) as "200 to 1499",
              sum(case when "TRANSACTION_AMT" > 1499 and "TRANSACTION_AMT" <= 2699 then "TRANSACTION_AMT" else 0 end) as "1500 to 2699",
              sum(case when "TRANSACTION_AMT" > 2699 then "TRANSACTION_AMT" else 0 end) as "2700 and above",
              count("TRANSACTION_AMT")
              from indiv_contrib
              WHERE "CMTE_ID" = 'C00575795';

    select count(*),date_trunc( 'month', "TRANSACTION_DT" ) from indiv_contrib
    WHERE "CMTE_ID" = 'C00575795'
    group by
    date_trunc( 'month', "TRANSACTION_DT" );

  */
}