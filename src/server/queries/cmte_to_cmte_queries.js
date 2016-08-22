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
                    select sum("TRANSACTION_AMT"),date_trunc( 'month', "TRANSACTION_DT" ) from cmte_to_cmte
                      WHERE "CMTE_ID" = '`+cmte_id+ `'
                      group by
                      date_trunc( 'month', "TRANSACTION_DT" );
                    `);
  },
  cmteByDsgn: function(cmte_id){
    return knex.raw(`
            SELECT SUM(cmte_to_cmte."TRANSACTION_AMT"), committee_master."CMTE_DSGN"
              FROM cmte_to_cmte
              INNER JOIN committee_master
              ON cmte_to_cmte."CMTE_ID"=committee_master."CMTE_ID"
              WHERE "OTHER_ID" = '`+cmte_id+`'
              GROUP BY committee_master."CMTE_DSGN";
            `);
  },
  cmteByCmteType: function(cmte_id){
    return knex.raw(`
            SELECT SUM(cmte_to_cmte."TRANSACTION_AMT"), committee_master."CMTE_TP",
              count("TRANSACTION_AMT")
              FROM cmte_to_cmte
              INNER JOIN committee_master
              ON cmte_to_cmte."CMTE_ID"=committee_master."CMTE_ID"
              WHERE "OTHER_ID" = '`+cmte_id+`'
              GROUP BY committee_master."CMTE_TP";
            `);
  },
  cmteByOrgType: function(cmte_id){
    return knex.raw(`
            SELECT SUM(cmte_to_cmte."TRANSACTION_AMT"), committee_master."ORG_TP",
              count("TRANSACTION_AMT")
              FROM cmte_to_cmte
              INNER JOIN committee_master
              ON cmte_to_cmte."CMTE_ID"=committee_master."CMTE_ID"
              WHERE "OTHER_ID" = '`+cmte_id+`'
              GROUP BY committee_master."ORG_TP";
            `);
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