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
  },
  cmteByDsgn: function(cmte_id){
    return knex('cmte_to_cmte')
            .select(knex.raw('SUM("cmte_to_cmte.TRANSACTION_AMT")'))
            .from('cmte_to_cmte')
            .innerJoin('committee_master', 'committee_master.CMTE_ID', 'cmte_to_cmte.OTHER_ID')
            .groupBy('cmte_master.CMTE_DSGN');
      }
  /*
    SELECT SUM(cmte_to_cmte."TRANSACTION_AMT"), committee_master."CMTE_DSGN"
      FROM cmte_to_cmte
      INNER JOIN committee_master
      ON cmte_to_cmte."CMTE_ID"=committee_master."CMTE_ID"
      WHERE "OTHER_ID" = 'C00575795'
      GROUP BY committee_master."CMTE_DSGN";
  */
}