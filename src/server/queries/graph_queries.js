var knex = require('./knex');

module.exports = {
  getTopCom: function(cmte){
    console.log(cmte);
    return knex('cmte_to_cmte')
            .innerJoin('committee_master', 'committee_master.CMTE_ID', 'cmte_to_cmte.OTHER_ID')
            .select('cmte_to_cmte.CMTE_ID', 'cmte_to_cmte.OTHER_ID', 'cmte_to_cmte.TRANSACTION_AMT', 'committee_master.CMTE_NM')
            .where({'cmte_to_cmte.CMTE_ID': cmte.CMTE_ID})
            .orderBy('cmte_to_cmte.TRANSACTION_AMT', 'desc')
            .limit(10);
  },
  getTopComSecondary: function(cmte){
    return knex('cmte_to_cmte')
            .innerJoin('committee_master', 'committee_master.CMTE_ID', 'cmte_to_cmte.OTHER_ID')
            .select('cmte_to_cmte.CMTE_ID', 'cmte_to_cmte.OTHER_ID', 'cmte_to_cmte.TRANSACTION_AMT', 'committee_master.CMTE_NM')
            .where({'cmte_to_cmte.CMTE_ID': cmte.OTHER_ID})
            .orderBy('cmte_to_cmte.TRANSACTION_AMT', 'desc')
            .limit(10);
  },
  getTopInd: function(cmte){
    return knex('indiv_contrib')
            .select('CMTE_ID', 'NAME', 'TRANSACTION_AMT')
            .where({'CMTE_ID': cmte.OTHER_ID})
            .orderBy('TRANSACTION_AMT', 'desc')
            .limit(10);
  }
};