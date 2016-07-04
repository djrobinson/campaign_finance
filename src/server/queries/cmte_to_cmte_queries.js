var knex = require('./knex');

module.exports = {
  getCmteCmteByDon: function(cmte_id, offset){
    return knex('cmte_to_cmte')
           .where({'CMTE_ID': cmte_id})
           .where('TRANSACTION_TP', 'LIKE', '2%')
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100)
           .offset(offset);
  },
  getCmteCmteByRec: function(cmte_id, offset){
    return knex('cmte_to_cmte')
           .where({'CMTE_ID': cmte_id})
           .where('TRANSACTION_TP', 'LIKE', '1%')
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100)
           .offset(offset);
  },
  getCmteCmteSort: function(offset){
    return knex('cmte_to_cmte')
           .orderBy('TRANSACTION_AMT', 'desc')
           .limit(100)
           .offset(offset);
  },
  cmteByDate: function(cmte_id){
    return knex.raw(`
                    select count(*),date_trunc( 'month', "TRANSACTION_DT" ) from cmte_to_cmte
                      WHERE "CMTE_ID" = '`+cmte_id+ `'
                      group by
                      date_trunc( 'month', "TRANSACTION_DT" );
                    `);
  }
}